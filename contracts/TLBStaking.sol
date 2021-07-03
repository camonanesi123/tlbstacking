// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

/**********************************************************************

████████╗██╗░░░░░██████╗░ ░░██████╗████████╗░█████╗░██╗░░██╗██╗███╗░░██╗░██████╗░
╚══██╔══╝██║░░░░░██╔══██╗░ ██╔════╝╚══██╔══╝██╔══██╗██║░██╔╝██║████╗░██║██╔════╝░
░░░██║░░░██║░░░░░██████╦╝░░╚█████╗░░░░██║░░░███████║█████═╝░██║██╔██╗██║██║░░██╗░
░░░██║░░░██║░░░░░██╔══██╗░░░╚═══██╗░░░██║░░░██╔══██║██╔═██╗░██║██║╚████║██║░░╚██╗
░░░██║░░░███████╗██████╦╝░░██████╔╝░░░██║░░░██║░░██║██║░╚██╗██║██║░╚███║╚██████╔╝
░░░╚═╝░░░╚══════╝╚═════╝░░░╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═╝░░╚══╝░╚═════╝░

********************************************************************** */


import "./lib/HRC20.sol";
import "./lib/SafeMath.sol";
import "./lib/TransferHelper.sol";

import "./ITLB10.sol";

contract TLBStaking is HRC20("TLB Staking", "TLB", 4, 48000 * 365 * 2 * (10 ** 4)), ITLB10 { 
    using SafeMath for uint256;
    //火币链上usdt代币地址
    address USDTToken = 0x9DefB199A6cDbfbaffe8c1C712F469e5c900a4De;
    //代币精度
    uint8   USDTPrecision = 2;
    uint    _usdtUnit = uint(10) ** USDTPrecision;
    uint    _tlbUnit = uint(10) ** 4;

    /* address USDTToken = 0x5e17b14ADd6c386305A32928F985b29bbA34Eff5; //0xFedfF21d4EBDD77E29EA7892c95FCB70bd27Fd28;
    uint8 USDTPrecision = 6; */
    
    // heco mainnet 
    // address USDTToken = 0xa71EdC38d189767582C38A3145b5873052c3e47a;
    // uint8 USDTPrecision = 18;
    
    //管理员
    Admin _admin;
    //张总
    Admin _zhang;
    //李总
    Admin _lee;
    
    uint    _tlbIncrement = _usdtUnit / 100; //TLB涨幅，每一层
    
    uint    price = _usdtUnit / 10;// TLB 初始价格
    uint32  maxUsers = 500500+499500; //最大用户数
    uint32  totalUsers = 0;//目前用户数
    uint16  currentLayer = 0;//当前层级
    //累计销毁
    uint    totalBurnt = 0;
    uint16  _positionInLayer = 0;//当前位置在 某一层中的位置
    
    uint    totalMineable = 28032000; //总计可以挖出来的矿
    uint    totalDeposit = 0;//系统总计存款
    
    //保险状态
    uint    insuranceCounterTime = now;
    uint    _insuranceTime = 0;
    uint    _insuranceDeposit = 0;
    address[36] _insuranceMembers;
    uint    _insuranceMemberCount;
    
    //动态收益列表
    uint8[][] sprigs = [
        [1, 1, 200], // 吃 第1层 静态收益的20%
        [2, 2, 150],// 吃 第2层 静态收益的15%
        [3, 7, 100],// 吃 第3-7层 静态收益的10%
        [8, 15, 50],// 吃 第8-15层 静态收益的5%
        [16, 20, 20]// 吃 第15-20层 静态收益的2%
    ];
    
    //第一个地址
    address public firstAddress; // by admin
    
    mapping(uint32 => address) private _prism;
    mapping(address => Node) private _nodes;
    
    Tier[]  _tiers;
    
    address _redeemAddress; // 1.5% redeem
    uint    redeemAmount; // 1.5% redeem
    uint    _controlAmount; // 1.5% redeem
    
    FundLog[] _inLogs; // all deposit logs; 所有入金账本
    FundLog[] _totalLogs;
    FundLog[] _luckyLogs;  // for 999 ~ 1001 layers; 位置奖金账本


    Order[] _buyBook;
    Order[] _sellBook;
    uint[][] _txBook;
    
    //矿工初始价格，和推广收益表
    uint[][] _minerTiers = [
        [15000 * _usdtUnit, 100, 100, 30], //15000U,100T,10%,30%
        [7500 * _usdtUnit, 50, 50, 20], 
        [3500 * _usdtUnit, 25, 25, 10], 
        [100 * _usdtUnit, 5, 10, 5]
    ];

    //矿工列表
    // address[] _minerlist;
    mapping(address=>Miner) _miners;
    mapping(address=>address[]) _referedMiners;
    
    // uint _minertotal; //总算力
    uint _minerCount; //矿工个数
    uint _minedTotal;
    WorkingMiner[] _minerlist; // [startBlock, tier];
    mapping(address=>uint) _minePool; // _minerlist index
    
    
    //构造方法， 合约创建时候执行
    constructor () public {
        uint _initialSupply  = maxSupply() * 20 / 100;
        _mint(msg.sender, _initialSupply);
        
        //初始化会员等级
        _tiers.push(Tier({
            index: 1,
            min: 200 * _usdtUnit,
            staticRewards: 16,  // 0.1%
            sprigs: 1,
            limit: 2200        // 0.1% 综合收益倍数
        }));
        _tiers.push(Tier({
            index: 2,
            staticRewards: 14,
            min: 1001 * _usdtUnit,
            sprigs: 2,
            limit: 2100        // 0.1%
        }));
        _tiers.push(Tier({
            index: 3,
            staticRewards: 12,
            min: 2001 * _usdtUnit,
            sprigs: 3,
            limit: 2000        // 0.1%
        }));
        _tiers.push(Tier({
            index: 4,
            staticRewards: 10,
            min: 5001 * _usdtUnit,
            sprigs: 4,
            limit: 1900        // 0.1%
        }));
    }

    //设置管理员，张总，李总 钱包地址。需要设置管理员地址，张总地址，李总地址。注意（张总，李总）作为股东身份参与，请另外使用地址
    function setAdmin(address admin,address lee,address zhang,address redeem) public override {
        require(owner() == msg.sender, 'Ownable: caller is not the owner');
        _admin.account = admin;
        _lee.account = lee;
        _zhang.account = zhang;
        _redeemAddress = redeem;
    }
    /*
    function admin() public override view returns(address,address,address,address) {
        require(owner() == msg.sender, 'Ownable: caller is not the owner');
        return (_admin.account,_zhang.account,_lee.account,_redeemAddress);
    }
    */
    function basicInfoAdmin() public override view returns(uint,uint,uint,uint) {
        require(owner() == msg.sender, 'Ownable: caller is not the owner');
        return (currentLayer,totalUsers,totalMineable,_insuranceTime);
    }
    
    /** 
    =================================================================

    ███╗░░░███╗██╗░░░░░███╗░░░███╗  ████████╗██████╗░███████╗███████╗
    ████╗░████║██║░░░░░████╗░████║  ╚══██╔══╝██╔══██╗██╔════╝██╔════╝
    ██╔████╔██║██║░░░░░██╔████╔██║  ░░░██║░░░██████╔╝█████╗░░█████╗░░
    ██║╚██╔╝██║██║░░░░░██║╚██╔╝██║  ░░░██║░░░██╔══██╗██╔══╝░░██╔══╝░░
    ██║░╚═╝░██║███████╗██║░╚═╝░██║  ░░░██║░░░██║░░██║███████╗███████╗
    ╚═╝░░░░░╚═╝╚══════╝╚═╝░░░░░╚═╝  ░░░╚═╝░░░╚═╝░░╚═╝╚══════╝╚══════╝
    =================================================================
    */
    /**
     * @dev Return required number of TPS to member. 计算入金时候需要的TLB数量
     */
    function amountForDeposit(uint amount) public override view returns(uint256) {
        return (amount * _tlbUnit) / (price * 10); // 10% TPS of amount
    }
    /**
     * @dev Return required number of TPS to member. 计算出金的时候TLB数量，前1000层 5个，1001层开始2个
     */
    function amountForWithdraw(address account) public override view returns(uint256) {
        if (account==_zhang.account || account==_lee.account || account==_admin.account) return 0;
        return (_nodes[account].layer<1001 ? 5 : 2) * uint(10) ** decimals();
    }
    /**
     * internal
     * @dev Logically add users to prism.
     * At this time, if the current layer is filled by the user, the number of layers and the price of TPS tokens will change.
     * 新增用户时候，把用户加入到棱形位置中 返回总用户数
     */
    function addUserToPrism() internal returns(uint32) {
        //当前层 可以允许的最大用户数
        uint32 maxUsersInLayer = currentLayer < 1001 ? currentLayer : 2000 - currentLayer;
        //当前层会员填满，需要新加一层，TLB涨价0.01
        if (maxUsersInLayer == _positionInLayer) {
            currentLayer++;
            emit AddLayer(currentLayer);
            price = SafeMath.add(price,_tlbIncrement);
            _positionInLayer = 1;
        } else {
            _positionInLayer++;
        }
        //总用户增加1
        totalUsers++;
        return totalUsers;
    }
    
    /**
     * internal
     * @dev Returns tier index corresponding to deposit amount. 根据入金数额获取当前会员等级
     */
    function getTier(uint amount) internal view returns(uint) {
        for(uint i=_tiers.length; i>0;i--) {
            if (amount>=_tiers[i-1].min) return i;
        }
        return 0;
    }
    
    /**
     * internal
     * @dev returns last node in branch. 返回分支上的最长路径节点 递归 recursive
     */
    function getLastInBranch(address parent) internal view returns(address){
        Node storage parentNode = _nodes[parent];
        return parentNode.children.length==0 ? parent : getLastInBranch(parentNode.children[0]);
    }
    
    /**
     * internal
     * @dev returns shareholder of linked chain of sender. 向上查找股东节点
     */
    function getShareholderInBranch(address parent) internal returns(address){
        Node storage parentNode = _nodes[parent];
        return parentNode.role==NodeType.Shareholder ? parent : getShareholderInBranch(parentNode.parent);
    }
    
    /**
     * internal
     * @dev Add or update a node when a user is deposited into the pool. 当用户存钱的时候，更新树形结构
     */
    function _deposit(address sender,address referalLink, uint amount, uint time) internal {
        uint32 userCount = totalUsers;
        require(userCount < maxUsers, "# full_users");
        if (userCount==0) {
            require(referalLink==_admin.account, "# Need_Admin_refereal_link");
        } else if (userCount<10){
            require(referalLink==firstAddress, "# NeedpNode_refereal_linkAddress");
        } else {
            if (_nodes[sender].lastAmount!=0) {
                require(_nodes[sender].referer==referalLink, "# invalid_referal_link");
            }
        }
        uint lastDeposit = _nodes[sender].lastAmount;
        if (lastDeposit!=0) {
            if (amount<10000) {
                require(amount - lastDeposit >= 100 * _usdtUnit, "# Too_Low_Invest");
            }
        } else {
            require(amount >= 200 * _usdtUnit, "# Too_Low_Invest");
        }
        
        uint _needTps = amountForDeposit(amount);
        
        require(balanceOf(sender) >= _needTps, "# Need_10%_Tlb");
        
        TransferHelper.safeTransferFrom(USDTToken, sender, address(this), amount);
        _burn(sender, _needTps);
        totalBurnt += _needTps;
        
        
        Node storage node = _nodes[sender];
        Node storage refererNode = _nodes[referalLink];
        
        
        //新用户第一次入金，改变树形结构
        if (node.lastTime==0) {
            
            uint32 position = addUserToPrism();
            address parent;
            //共生节点
            if (totalUsers==1) {
                node.role = NodeType.PNode;
                firstAddress = sender;
                parent = referalLink;
            } else if (currentLayer<5) { //股东节点
                parent = referalLink;
                node.role = NodeType.Shareholder;
                _nodes[parent].children.push(sender);
            } else { //其他用户
                node.role = NodeType.Guest;
                uint16 countBranch = refererNode.referalCount / 3;
                uint16 remainInBranch = refererNode.referalCount % 3;
                //如果之前的路径上 推荐满了3个用户，则新开分支
                if (remainInBranch==0) {
                    parent = referalLink;
                } else {
                    //根据推荐人的地址 查找当前最长路径, 作为最后一个分支的新节点附加
                    parent = getLastInBranch(refererNode.children[countBranch]);
                }
                _nodes[parent].children.push(sender);
            }
            //推荐人的推荐数量+1
            refererNode.referalCount++;
            node.userid = 100880011 + userCount;
            node.referer = referalLink;
            node.position = position;
            node.layer = currentLayer;
            node.balance = amount;
            
            node.isOverflowed = false;
            node.rewards = 0; // for shareholder
            node.parent = parent;
            node.referalCount = 0;
            if (position > 502503) { // save prism position from 1002 layer
                _prism[position] = sender;
            }
            
            emit AddUser(sender,totalUsers);
        } else { //老用户入金，不改变结构，直接改变本金
            if (node.isOverflowed || insuranceCounterTime>node.lastTime) {
                node.staticRewards = 0;
                node.dynamicRewards = 0;
            } else {
                (bool overflowed,uint staticRewards,,,) = profits(sender); 
                if (overflowed) {
                    node.staticRewards = 0;
                    node.dynamicRewards = 0;
                } else {
                    node.staticRewards = staticRewards;
                    if (staticRewards > 0) {
                        _updateDynamicRewardsAllParentNode(node);
                    }    
                }
            }
            node.balance += amount;
        }
        //更新最后一次存款金额    
        node.lastAmount = amount;
        //更新最后一次存款时间
        node.lastTime = time;
        node.totalDeposit += amount;
        totalDeposit += amount;
        _insuranceDeposit += amount;
        //重新计算会员等级
        uint8 tier = (uint8)(getTier(node.balance));
        //根据新的会员等级，计算综合收益
        node.limit = node.balance * _tiers[tier-1].limit / 1000;
        //更新会员等级
        node.tier = tier;
        //更新爆仓状态 (这里可能需要修改，爆仓状态接触后，需要把会员的动态+静态 部分 设计为0， 股东奖励部分 不清零)

        if (node.isOverflowed) node.isOverflowed=false;
        redeemAmount += amount * 18 / 1000; // 1.5% 回购资金
        _controlAmount += amount * 32 / 1000; // 1.5% 护盘资金
        _admin.rewards += amount * 20 / 1000; // 2% 管理员奖金
        _zhang.rewards += amount * 15 / 1000; // 1.5% 张总奖金
        _lee.rewards += amount * 15 / 1000; // 1.5% 李总奖金
        
        if (_insuranceMemberCount==36) {
            for(uint i=1; i<_insuranceMemberCount;i++) {
                _insuranceMembers[i-1] = _insuranceMembers[i-1];
            }
            _insuranceMemberCount = 35;
        }
        _insuranceMembers[_insuranceMemberCount] = sender;
        _insuranceMemberCount++;
        
        
        if (node.role == NodeType.Guest) {
            Node storage shareholderNode;
            if (refererNode.role==NodeType.Shareholder) {
                shareholderNode = refererNode;
            } else {
                //查找该用户的股东
                address shareholder = getShareholderInBranch(referalLink);
                shareholderNode = _nodes[shareholder];
            }
            shareholderNode.rewards += amount * 40 / 1000; // 4%; 股东奖金
        }
        checkInsurance();
        _processSellOrder();
    }
    
    // update dynamicRewards of all parents (max 20)
    function _updateDynamicRewardsAllParentNode(Node storage node) internal {
        // Node storage parent;
        uint8 tier;
        uint rewards = 0;
        for(uint i=0; i<20; i++) {
            tier = node.parent==_admin.account ? 4 : _nodes[node.parent].tier;
            if (tier>=1 && i==1) {
                 rewards = node.staticRewards * sprigs[0][2] / 1000;
            } else if (tier>=1 && i==2) {
                 rewards = node.staticRewards * sprigs[1][2] / 1000;
            } else if (tier>=2 && i>=3 && i<=7) {
                 rewards = node.staticRewards * sprigs[2][2] / 1000;
            } else if (tier>=3 && i>=8 && i<=16) {
                 rewards = node.staticRewards * sprigs[3][2] / 1000;
            } else if (tier>=4) {
                 rewards = node.staticRewards * sprigs[4][2] / 1000;
            }
            if (rewards>0) {
                if (node.parent==_admin.account) {
                    _admin.rewards += rewards;
                    break;
                } else {
                    _nodes[node.parent].dynamicRewards += rewards;
                }
            }
        }
    }
    // for test
    function _staticRewardOf(Node storage node) internal view returns(uint) {
        if (node.lastTime<_insuranceTime) return 0;
        uint date = (now - node.lastTime) / 60;
        return node.lastTime<_insuranceTime ? 0 : node.staticRewards + node.balance * _tiers[node.tier-1].staticRewards * date / (1000 * 1440);
    }
    
    function _childrenInfo(address account, uint deep, uint maxDeep) internal view returns(ChildInfoReturn memory) {
        Node storage node = _nodes[account];
        uint countBranch = (deep!=0 || account==firstAddress) ? node.children.length : node.referalCount / 3;
        uint staticRewards = 0;
        uint funds = 0;
        uint rewards = 0;
        uint count = 0;
        for(uint i = 0; i<countBranch; i++) {
            address _child = node.children[i];
            Node storage _childNode = _nodes[node.children[i]];
            
            if (!_childNode.isOverflowed) {
                staticRewards = _staticRewardOf(_childNode);
                if (node.tier>=1 && deep==0) {
                     rewards += staticRewards * sprigs[0][2] / 1000;
                } else if (node.tier>=1 && deep==1) {
                     rewards += staticRewards * sprigs[1][2] / 1000;
                } else if (node.tier>=2 && deep>=2 && deep<=6) {
                     rewards += staticRewards * sprigs[2][2] / 1000;
                } else if (node.tier>=3 && deep>=7 && deep<=15) {
                     rewards += staticRewards * sprigs[3][2] / 1000;
                } else if (node.tier>=4) {
                     rewards += staticRewards * sprigs[4][2] / 1000;
                }
                if (deep<maxDeep-1) {
                    ChildInfoReturn memory ci= _childrenInfo(_child, deep+1, maxDeep);
                    count += ci.count;
                    funds += ci.funds;
                    rewards += ci.rewards;
                }
                count++;
                funds += _childNode.totalDeposit;
            }
        }
        
        return ChildInfoReturn(count, funds, rewards);
    }
    function _childrenInfoAll(address account, uint deep) internal view returns(uint, uint) {
        Node storage node = _nodes[account];
        uint _children = 0;
        uint _totalDeposit = 0;
        for(uint i = 0; i<node.children.length; i++) {
            address _child = node.children[i];
            Node storage _childNode = _nodes[node.children[i]];
            if (deep<19) {
                (uint count, uint funds)= _childrenInfoAll(_child, deep+1);
                _children += count;
                _totalDeposit += funds;
            }
            _children++;
            _totalDeposit += _childNode.totalDeposit;
        }
        
        return (_children, _totalDeposit);
    }
    
    //计算合约中剩余USDT数目
    function _totalUsdtBalance() internal view returns(uint) {
        return IHRC20(USDTToken).balanceOf(address(this));
    }
    //计算合约中剩余USDT数目
    function _insuranceAmount() internal view returns(uint) {
        return _totalUsdtBalance() * 50 / 1000;
    }
    
    function contractInfo() public override view returns(uint[14] memory) {
        (uint _mCount, uint _mtotal) = _minerRealPower();
        return [
            price,
            totalDeposit,
            redeemAmount,
            _totalSupply,
            totalBurnt,
            insuranceCounterTime,
            _insuranceAmount(),
            // 矿机信息
            _minerCount,
            _mtotal,
            _mCount,
            _minerPrice(0),
            _minerPrice(1),
            _minerPrice(2),
            _minerPrice(3)
            
        ];
    }
    function accountInfo(address account) public override view returns(uint[8] memory) {
        require(account!=address(0), "invalid_account");
        uint _userid = 0;
        uint _adep = 0;
        uint _aw = 0;
        uint _limit = 0;
        uint _lastAmount = 0;
        uint _children = 0;
        uint _totalDeposit = 0;
        uint _tlb = balanceOf(account);
        if (account==_admin.account) {
            _aw = _admin.totalRewards;
            (uint count,uint funds) = _childrenInfoAll(firstAddress, 1);
            _children = 1 + count;
            _totalDeposit = _nodes[firstAddress].totalDeposit + funds;
        } else if (account==_zhang.account) {
            _aw = _admin.totalRewards;
        } else if (account==_lee.account) {
            _aw = _admin.totalRewards;
        } else {
            Node storage node = _nodes[account];
            _userid = node.userid;
            _lastAmount = node.lastAmount;
            _aw = node.totalWithdrawal;
            _adep = node.totalDeposit;
            _limit = node.limit;
            (_children,_totalDeposit) = _childrenInfoAll(account, 0);
        }
        
        return [
            _userid,_tlb,_lastAmount,_adep,_aw,_limit,_children,_totalDeposit
        ];
    }
    function nodeinfo(address sender) public override view returns(uint, address, address[] memory) {
        return (_nodes[sender].referalCount, _nodes[sender].parent,_nodes[sender].children);
    }
    
    function profits(address account) public override view returns(bool, uint, uint, uint, uint) {
        bool overflowed = false;
        uint staticRewards = 0;
        uint dynamicRewards = 0;
        uint rewards = 0;
        uint withdrawal = 0;
        //计算管理员可提现 正确
        if (account==_admin.account) {
            Node storage node = _nodes[firstAddress];
            withdrawal = _admin.rewards + _staticRewardOf(node) * sprigs[0][2] / 1000;
            ChildInfoReturn memory ci = _childrenInfo(firstAddress, 1, 19);
            dynamicRewards = ci.rewards;
        } else if (account==_zhang.account) { //计算张总可提现金额 正确
            withdrawal = _zhang.rewards;
        } else if (account==_lee.account) { //计算李总可提现 正确
            withdrawal = _lee.rewards;
        } else { //计算其他会员可提现 动态+静态+奖金（位置奖金 或者 股东奖励）正确
            Node storage node = _nodes[account];
            overflowed = node.lastTime < _insuranceTime;
            require(!overflowed, "Overflowed");
            require(node.tier>0, "expected_valid_tier");
            rewards = node.rewards;
            Tier storage tier = _tiers[node.tier-1];
            ChildInfoReturn memory ci = _childrenInfo(account, 0, sprigs[tier.sprigs][1]);
            staticRewards = _staticRewardOf(node);
            dynamicRewards = ci.rewards;
            if (node.layer>998 && node.layer<1002) {
                for(uint i=0;i<_luckyLogs.length;i++) {
                    FundLog storage _log1 = _luckyLogs[i];
                    if (_log1.time>node.lastTime) { //如果上一次提现时间，在奖金统计时间中。 则将奖励 计算给用户
                        rewards = _log1.balance / 2998;
                    }
                }
            }
            overflowed = (staticRewards + ci.rewards + rewards) > node.balance * tier.limit / 1000;
            if (!overflowed) {
                if (node.layer<5) {
                    withdrawal = (staticRewards + dynamicRewards) * 850 / 1000 + rewards;
                } else if (node.layer>998) {
                    withdrawal = (staticRewards + dynamicRewards + rewards) * 850 / 1000;
                } else {
                    withdrawal = (staticRewards + dynamicRewards) * 850 / 1000;
                }
            }
            
        }
        return (overflowed, staticRewards, dynamicRewards, rewards, withdrawal);
    }
    
    // must call this function every 36hrs on server backend
    function checkInsurance() public override{
        if (now - insuranceCounterTime >= 129600) {
            if ((_insuranceDeposit * 1000 / totalDeposit) < 20) {
                _insuranceTime = insuranceCounterTime + 129600;
                uint amount = _insuranceAmount();
                uint p20 = amount * 20 / 100;
                uint p1 = amount * 80 / 3500;
                for(uint i=0; i<_insuranceMemberCount; i++) {
                    Node storage node = _nodes[_insuranceMembers[i]];
                    node.lastTime = _insuranceTime + 1;
                    node.rewards = i==35 ? p20 : p1;
                }
            }
            _insuranceDeposit = 0;    
            _insuranceMemberCount = 0;
        }
    }
    
    
    //入金方法 外部调用 正确
    function deposit(address referalLink, uint amount) public override{
        address sender = _msgSender();
        require(sender!=address(0), "# Invalid_sender");
        require(referalLink!=address(0), "# invalid_referal_link");
        _deposit(sender, referalLink, amount, now);
    }

    //提现方法 管理员 出金也需要TLB 管理员购买矿机，可以不要钱
    function withdraw() public override {
        address sender = _msgSender();
        require(sender!=address(0), "# Invalid_sender");
        //计算当时间，会员可提金额
        (bool overflowed, uint staticRewards, uint dynamicRewards, uint rewards, uint withdrawable) = profits(sender);
        require(!overflowed, "# Overflowed");
        //管理员提现，不扣任何手续费，然后系统记录总账 管理员不能作为用户 参与游戏）
        if (sender==_admin.account) {
            _admin.rewards = 0;
            _admin.totalRewards += withdrawable;
            _admin.lastWithdrawTime = now;
        } else if (sender==_zhang.account) { //张总提现，只扣张的奖金部分，然后系统记录总账（注意，张总地址不能作为用户 参与游戏）
            _zhang.rewards = 0;
            _zhang.totalRewards += withdrawable;
            _zhang.lastWithdrawTime = now;
        } else if (sender==_lee.account) { //李总提现，只扣李的奖金部分，然后系统记录总账（注意，李总地址不能作为用户 参与游戏）
            _lee.rewards = 0;
            _lee.totalRewards += withdrawable;
            _lee.lastWithdrawTime = now;
        } else { //会员提现
            Node storage node = _nodes[sender];
            if (node.balance>0) {
                node.totalWithdrawal += withdrawable;
                node.lastTime = now;
                node.staticRewards = 0;
                node.dynamicRewards = 0;
                node.rewards = 0;
                //计算方式 正确
                uint benefit = staticRewards + dynamicRewards;
                uint half = ((node.layer<5 ? 0 : rewards ) + benefit) / 2;
                if (node.balance > half) {
                    node.balance -= half;
                    uint8 tier = (uint8)(getTier(node.balance));
                    if (tier!=node.tier) {
                        node.tier = tier;
                        node.limit = node.balance * _tiers[tier-1].limit / 1000;
                    } else {
                        node.limit -= half;
                    }
                } else {
                    node.tier = 0;
                    node.balance = 0;
                    node.limit = 0;
                }
                // Symmetrische Positionsbelohnung 对称位置奖金  (动态收益+静态收益)*50%*30%*50%
                if (node.layer<999) {
                    uint pos = benefit * 75 / 1000; 
                    address posAddr = _prism[1e6-node.position]; //对称位置 计算错误
                    //该位置没有用户时候，应该记录奖金累计数。 有用户时候，应该将该奖金加到用户rewards
                    if (posAddr!=address(0)) {
                        Node storage posNode = _nodes[sender];    
                        posNode.rewards += pos;
                    }
                    // Belohnung für jede Position 999-1000-1001 (insgesamt 2998 Personen) 999-1000-1001层 2998 个位置 
                    _luckyLogs.push(FundLog({
                        time:now,
                        balance:pos,
                        tier:0
                    }));
                } else { //其他情况，记录回购资金
                    redeemAmount += benefit * 150 / 1000;
                }
            }
        }
        //如果可提金额大于0
        if (withdrawable>0) {
            //计算需要燃烧的TLB数量
            TransferHelper.safeTransfer(USDTToken, sender, withdrawable);
            uint _needTps = amountForWithdraw(sender);
            if (_needTps>0) {
                //燃烧用户钱包中的TLB
                _burn(sender, _needTps);
                //统计 总计燃烧数额
                totalBurnt += _needTps;
            }
        }
        _processSellOrder();
    }
    
    /**
    =======================================================================================
    ██████╗░██╗░░░██╗██╗░░░██╗  ░█████╗░███╗░░██╗██████╗░  ░██████╗███████╗██╗░░░░░██╗░░░░░
    ██╔══██╗██║░░░██║╚██╗░██╔╝  ██╔══██╗████╗░██║██╔══██╗  ██╔════╝██╔════╝██║░░░░░██║░░░░░
    ██████╦╝██║░░░██║░╚████╔╝░  ███████║██╔██╗██║██║░░██║  ╚█████╗░█████╗░░██║░░░░░██║░░░░░
    ██╔══██╗██║░░░██║░░╚██╔╝░░  ██╔══██║██║╚████║██║░░██║  ░╚═══██╗██╔══╝░░██║░░░░░██║░░░░░
    ██████╦╝╚██████╔╝░░░██║░░░  ██║░░██║██║░╚███║██████╔╝  ██████╔╝███████╗███████╗███████╗
    ╚═════╝░░╚═════╝░░░░╚═╝░░░  ╚═╝░░╚═╝╚═╝░░╚══╝╚═════╝░  ╚═════╝░╚══════╝╚══════╝╚══════╝
    =======================================================================================
    */

    function _buy(address sender, uint amountUsdt) internal {
        uint _tlbInit = amountUsdt * _tlbUnit / price;
        uint _tlb = _tlbInit;
        
        uint countRemove = 0;
        uint txCount = _txBook.length;
        TransferHelper.safeTransferFrom(USDTToken, sender, address(this), amountUsdt);
        for(uint i=0; i<_sellBook.length; i++) {
            Order storage order = _sellBook[i];
            if (order.balance>=_tlb) {
                uint amount = (_tlb * price * 998 )  / (_tlbUnit * 1000);
                TransferHelper.safeTransfer(USDTToken, order.account, amount);
                _txBook.push([10001 + (txCount++),0,_tlb,now]);
                order.balance -= _tlb;
                _tlb = 0;
                if (order.balance==0) countRemove++;
                break;
            } else {
                uint amount = (order.balance * price * 998 )  / (_tlbUnit * 1000);
                TransferHelper.safeTransfer(USDTToken, order.account, amount);
                _txBook.push([10001 + (txCount++),0,order.balance,now]);
                _tlb -= order.balance;
                order.balance = 0;
                countRemove++;
            }
        }
        
        if (countRemove>0) {
            for(uint i=countRemove;i<_sellBook.length;i++) {
                _sellBook[i-countRemove].account = _sellBook[i].account;
                _sellBook[i-countRemove].initial = _sellBook[i].initial;
                _sellBook[i-countRemove].balance = _sellBook[i].balance;
            }
            for(uint i=0;i<countRemove;i++) _sellBook.pop();
        }
        if (_tlb>0) {
            uint balance = _tlb * price / _tlbUnit;
            _buyBook.push(Order({
                time:now,
                account:sender,
                initial:amountUsdt,
                balance:balance
            }));
            emit BuyOrderAdded(sender, balance);
        }
        if (_tlbInit - _tlb>0) {
            _transfer(address(this), sender, _tlbInit - _tlb);
        }
        _processSellOrder();
    }
    //购买TLB 方法正确
    function buy(uint amountUsdt) public override {
        address sender = _msgSender();
        require(sender!=address(0), "# Invalid_sender");
        _buy(sender, amountUsdt);
    }

    //撤销买单，当 卖队列无法满足 买队列时 正确
    function cancelBuyOrder() public override {
        address sender = _msgSender();
        require(sender!=address(0), "# Invalid_sender");
        uint count = 0;
        uint balance = 0;
        for(uint i=0;i<_buyBook.length;i++) {
            Order storage order = _buyBook[i];
            
            if (order.account==sender) {
                
                // require(false,"1");
                balance += order.balance;
                count++;
                continue;
            }
            if (count>0) {
                _buyBook[i-count].account = _buyBook[i].account;
                _buyBook[i-count].initial = _buyBook[i].initial;
                _buyBook[i-count].balance = _buyBook[i].balance;    
            }
        }
        if (count>0) {
            for(uint i=0; i<count; i++) _buyBook.pop();
            // TransferHelper.safeApprove(USDTToken, sender, balance);
            TransferHelper.safeTransfer(USDTToken, sender, balance);
            emit BuyOrderCancelled(sender, balance);
        }
        _processSellOrder();
    }
    function _sell(address sender, uint amountTlb) internal {
        uint _usdtInit = amountTlb * price / _tlbUnit;
        uint _usdt = _usdtInit;
        
        uint countRemove = 0;
        uint txCount = _txBook.length;
        _transfer(sender, address(this), amountTlb);
        for(uint i=0; i<_buyBook.length; i++) {
            Order storage order = _buyBook[i];
            if (order.balance>=_usdt) {
                uint _tlb = _usdt * _tlbUnit / price;
                _transfer(address(this), order.account, _tlb);
                _txBook.push([10001 + (txCount++),1,_tlb,now]);
                order.balance -= _usdt;
                _usdt = 0;
                if (order.balance==0) countRemove++;
                break;
            } else {
                uint _tlb = order.balance * _tlbUnit / price;
                _transfer(address(this), order.account, _tlb);
                _txBook.push([10001 + (txCount++), 1, _tlb, now]);
                _usdt -= order.balance;
                order.balance = 0;
                countRemove++;
            }
        }
        if (countRemove>0) {
            for(uint i=countRemove;i<_buyBook.length;i++) {
                _buyBook[i-countRemove].account = _buyBook[i].account;
                _buyBook[i-countRemove].initial = _buyBook[i].initial;
                _buyBook[i-countRemove].balance = _buyBook[i].balance;
            }
            for(uint i=0;i<countRemove;i++) _buyBook.pop();
        }
        if (_usdt>0) {
            uint balance = _usdt * _tlbUnit / price;
            _sellBook.push(Order({
                time: now,
                account:sender,
                initial:amountTlb,
                balance:balance
            }));
            emit SellOrderAdded(sender, balance);
        }
        if (_usdtInit - _usdt>0) {
            TransferHelper.safeTransfer(USDTToken, sender, (_usdtInit - _usdt) * 998 / 1000);
        }
        _processSellOrder();
    }
    //卖出 TLB 方法正确
    function sell(uint amountTlb) public override {
        address sender = _msgSender();
        require(sender!=address(0), "# Invalid_sender");
        _sell(sender, amountTlb);
    }
    //撤销卖单
    function cancelSellOrder() public override {
        address sender = _msgSender();
        require(sender!=address(0), "# Invalid_sender");
        uint count = 0;
        uint balance = 0;
        for(uint i=0;i<_sellBook.length;i++) {
            Order storage order = _sellBook[i];
            if (order.account==sender) {
                balance += order.balance;
                count++;
                continue;
            }
            if (count>0) {
                _sellBook[i-count].time = _sellBook[i].time;
                _sellBook[i-count].account = _sellBook[i].account;
                _sellBook[i-count].initial = _sellBook[i].initial;
                _sellBook[i-count].balance = _sellBook[i].balance;
            }
        }
        if (count>0) {
            for(uint i=0; i<count; i++) _sellBook.pop();
            _transfer(address(this), sender, balance);
            emit SellOrderCancelled(sender, balance);
        }
        _processSellOrder();
    }
    //查询订单历史记录
    function orderHistory() public override view returns(uint[4][] memory) {
        uint count = _txBook.length>10 ? 10 : _txBook.length;
        // uint[][] memory logs = new uint[][](count);
        uint[4][] memory logs = new uint[4][](count);
        for(uint i=0; i<count; i++) {
            uint[] storage order= _txBook[_txBook.length - count + i];
            // logs.push(order);
            // logs.push([order[0],order[1],order[2],order[3]]);
            // OrderTx storage order = _txBook[_txBook.length-count];
            logs[i][0] = order[0];  // order id
            logs[i][1] = order[1];  // 0: buy, 1: sell
            logs[i][2] = order[2];  // amount
            logs[i][3] = order[3];  // time
        }
        return logs;
    }
    function pendingOrder(address account) public view returns(uint[4][] memory) {
        uint count = 0;
        for(uint i=0;i<_buyBook.length;i++) {
            Order storage order = _buyBook[i];
            if (order.account==account) count++;
        }
        for(uint i=0;i<_sellBook.length;i++) {
            Order storage order = _sellBook[i];
            if (order.account==account) count++;
        }
        uint[4][] memory logs = new uint[4][](count);
        uint k=0;
        for(uint i=0;i<_buyBook.length;i++) {
            Order storage order = _buyBook[i];
            if (order.account==account) {
                logs[k][0] = order.time;    // time
                logs[k][1] = 0;             // 0: buy, 1: sell
                logs[k][2] = order.initial; // initial
                logs[k][3] = order.balance; // amount
                k++;
            }
        }
        for(uint i=0;i<_sellBook.length;i++) {
            Order storage order = _sellBook[i];
            if (order.account==account) {
                logs[k][0] = order.time;    // time
                logs[k][1] = 1;             // 0: buy, 1: sell
                logs[k][2] = order.initial; // initial
                logs[k][3] = order.balance; // amount
                k++;
            }
        }
        return logs;
    }
    //触发回购操作
    function _processSellOrder() internal {
        uint count = 0;
        uint sumTps = 0;
        uint _redeemAmount = redeemAmount * 5 / 100;
        for(uint i=0;i<_sellBook.length;i++) {
            Order storage order = _sellBook[i];
            if (now-order.time>86400) {
                uint amount = order.balance * price;
                if (_redeemAmount >= amount) {
                    count++;
                    _redeemAmount -= amount;
                    redeemAmount -= amount;
                    sumTps += order.balance;
                    // TransferHelper.safeApprove(USDTToken, order.account, amount);
                    TransferHelper.safeTransfer(USDTToken, order.account, amount);
                    if (count==2) break;
                } else {
                    break;
                }
            }
        }
        if (sumTps>0) _transfer(address(this), _redeemAddress, sumTps);
    }

    /**
    =======================================================================================
    
    ░██████╗████████╗░█████╗░██╗░░██╗██╗███╗░░██╗░██████╗░  ████████╗██╗░░░░░██████╗░
    ██╔════╝╚══██╔══╝██╔══██╗██║░██╔╝██║████╗░██║██╔════╝░  ╚══██╔══╝██║░░░░░██╔══██╗
    ╚█████╗░░░░██║░░░███████║█████═╝░██║██╔██╗██║██║░░██╗░  ░░░██║░░░██║░░░░░██████╦╝
    ░╚═══██╗░░░██║░░░██╔══██║██╔═██╗░██║██║╚████║██║░░╚██╗  ░░░██║░░░██║░░░░░██╔══██╗
    ██████╔╝░░░██║░░░██║░░██║██║░╚██╗██║██║░╚███║╚██████╔╝  ░░░██║░░░███████╗██████╦╝
    ╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═╝░░╚══╝░╚═════╝░  ░░░╚═╝░░░╚══════╝╚═════╝░
    =======================================================================================
    */
    
    //矿工信息， 返回 算力，挖矿方式，是否激活
    
    //计算 矿机价格每增加一层 认购价格 矿机认购价格在原基础上 增加0.1% 正确
    function _minerPrice(uint tier) internal view returns(uint) {
        if (tier>=0 && tier<4) return _minerTiers[tier][0] + _minerTiers[tier][0] * currentLayer / 1000; 
        return 0;
    }
    function _minerRealPower() internal view returns(uint,uint) {
        uint _count=0;
        uint _realpower = 0;
        for(uint i=0; i<_minerlist.length; i++) {
            if (_minerlist[i].lastBlock+9600 > block.number) {
                _count++;
                _realpower += _minerlist[i].tier;
            }
        }
        return (_count, _realpower);
    }
    
    
    //计算 待领取的TLB 奖励 正确
    function _pendingPool(address account) internal view returns(uint,uint) {
        Miner storage miner= _miners[account];
        if (miner.lastBlock!=0) {
            (,uint _realpower) = _minerRealPower();
            if (miner.mineType==0) {
                uint diff = block.number - miner.lastBlock;
                if (diff>9600) diff = 9600;
                return (diff,miner.pending + diff * 48000 * 10 ** uint(decimals()) * miner.tier / (28800 * _realpower));
            } else {
                uint diff = block.number - miner.lastBlock;
                return (diff,miner.pending + diff * 48000 * 10 ** uint(decimals()) * miner.tier / (28800 * _realpower));
            }
        }
        return (0, miner.pending);
    }
    function _stopMining(address account) internal {
        uint _index = _minePool[account];
        if (_index>0) {
            for(uint i=_index; i<_minerlist.length; i++) {
                _minerlist[i-_index].account = _minerlist[i].account;
                _minerlist[i-_index].mineType = _minerlist[i].mineType;
                _minerlist[i-_index].tier = _minerlist[i].tier;
                _minerlist[i-_index].lastBlock = _minerlist[i].lastBlock;
            }
            _minerlist.pop();
            _minePool[account] = 0;
        }
    }
    function mineInfo(address account) public override view returns(uint[11] memory) {
        address[] storage referees = _referedMiners[account];
        uint _minerRefTotal = 0;
        uint _count = referees.length;
        uint _minerStatus = 0;
        (,uint _realpower) = _minerRealPower();
        for (uint i=0; i<referees.length; i++) {
            _minerRefTotal += _miners[referees[i]].tier;
        }
        
        Miner storage _mnr= _miners[account];
        if (_mnr.lastBlock>0) {
            if (_mnr.mineType==0) {
                _minerStatus = (block.number - _mnr.lastBlock)<9600 ? 1 : 0;
            } else {
                _minerStatus = 1;
            }
        }
        // pending
        (uint _pendingBlocks, uint _pending) = _pendingPool(account);
        uint _blockRewards = _realpower!=0 ? (_mnr.tier * 48000 * _tlbUnit) / (28800 * _realpower) : 0;
        return [
            _mnr.tier,
            _blockRewards,
            _mnr.mineType,
            _count, 
            _minerRefTotal,
            _minerStatus,
            _mnr.lastBlock,
            _mnr.lastTime,
            _mnr.rewards,
            _pendingBlocks,
            _pending
        ];
    }
    //购买矿机 
    function _buyMiner(address sender, address referalLink, uint amountUsdt) internal {
        uint referalRewards = 0;
        (uint8 tier, uint referalRewardRate) = minerTierInfo(amountUsdt); //返回 算力，推荐人奖金比率
        require(tier>0, "# Invalid_amount");
        
        Miner storage miner= _miners[sender];
        
        if (sender!=_admin.account) {
            referalRewards = amountUsdt * referalRewardRate / 1000;
            
            TransferHelper.safeTransferFrom(USDTToken, sender, address(this), amountUsdt);//  - referalRewards + referalRewards * 10 / 100);
            if (referalLink!=address(0)) {
                uint directRewards = referalRewards * 90 / 100;
                TransferHelper.safeApprove(USDTToken, referalLink, directRewards);
                TransferHelper.safeTransfer(USDTToken, referalLink, directRewards);
                
                if (miner.tier!=0) {
                    //以前购买过，必须使用推荐人连接购买
                    require(miner.referer == referalLink, "Invalid_ReferalLink");
                }
                //记录推荐人
                _referedMiners[referalLink].push(sender);
                miner.referer = referalLink;
            }
            redeemAmount += referalRewards * 10 / 100;
            _admin.rewards += amountUsdt * 20 / 1000; // 2%
            _zhang.rewards += amountUsdt * 15 / 1000; // 1.5%
            _lee.rewards += amountUsdt * 15 / 1000; // 1.5%
        }
        //如果没有购买过
        if (miner.tier==0) {
            miner.mineType = 0;//挖矿种类
            miner.tier = tier;//算力大小
            _minerCount++;//矿工数+1
        } else {
            if (miner.lastBlock!=0) {
                (,uint withdrawal) = _pendingPool(sender);
                miner.pending = withdrawal;
            }
            //矿工后续购买，该矿工算力增加
            miner.tier += tier;
        }
        miner.lastBlock = 0;//还不开始挖矿
        miner.lastTime = now;
        _stopMining(sender);
    }
    function buyMiner(address referalLink, uint amountUsdt) public override {
        address sender = _msgSender();
        require(sender!=address(0), "# Invalid_sender");
        _buyMiner(sender,referalLink,amountUsdt);
    }
    //根据购买金额，返回，算力和推广收益 正确
    function minerTierInfo(uint amountUsdt) internal view returns(uint8,uint) {
        for(uint i=0; i<_minerTiers.length; i++) {
            uint _mp = _minerTiers[i][0];
            uint _pr = _mp + _mp * currentLayer / 1000;
            if (_pr==amountUsdt) {
                //大于100层，推广收益变化
                if (currentLayer>100) return (uint8(_minerTiers[i][1]),_minerTiers[i][3]);
                //100层以内，推广收益维持原状
                return (uint8(_minerTiers[i][1]),_minerTiers[i][2]);
            }
        }
        return (0, 0);
    }
    
    //触发领取奖励动作 正确
    function withdrawFromPool() public override{
        address sender = _msgSender();
        require(sender!=address(0), "# Invalid_sender");
        Miner storage miner= _miners[sender];
        (,uint withdrawal) = _pendingPool(sender);
        require(withdrawal>0, "# Invalid_sender");
        require(_minedTotal + withdrawal<= totalMineable, "# overflow_total_mine");
        //重新设置一下 矿工区块时间
        miner.lastBlock = miner.mineType==0 ? 0 : block.number;
        miner.rewards += withdrawal;
        miner.pending = 0;
        //统计总共挖出来的 TLB数量
        _minedTotal += withdrawal;
        _mint(sender, withdrawal);
        _stopMining(sender);
    }
    //开始挖矿，每次提现后必须重新触发 （需要添加判断 没有购买矿机的人 不能触发该操作）
    function _startMine(address account) internal {
        Miner storage miner= _miners[account];
        require(miner.tier!=0, "# Invalid_miner");
        require(miner.lastBlock==0, "# Already_started");
        
        uint _index = _minePool[account];
        if (_index>0) {
            _minerlist[_index-1].account = account;
            _minerlist[_index-1].mineType = miner.mineType;
            _minerlist[_index-1].tier = miner.tier;
            _minerlist[_index-1].lastBlock = block.number;
            (,uint withdrawal) = _pendingPool(account);
            miner.pending = withdrawal;
        } else {
            _minerlist.push(WorkingMiner({
                account:account,
                mineType:miner.mineType,
                tier:miner.tier,
                lastBlock:block.number
            }));
            _minePool[account] = _minerlist.length;
        }
        miner.lastBlock = block.number;
    }
    function startMine() public override {
        address sender = _msgSender();
        require(sender!=address(0), "# Invalid_sender");
        _startMine(sender);
    }
    
    function minerList() public override view returns(WorkingMiner[] memory) {
        (uint count,) = _minerRealPower();
        WorkingMiner[] memory res = new WorkingMiner[](count);
        uint k = 0;
        for(uint i=0; i<_minerlist.length; i++) {
            if (_minerlist[i].lastBlock+9600 > block.number) {
                res[k].account   = _minerlist[i].account;
                res[k].mineType  = _minerlist[i].mineType;
                res[k].tier      = _minerlist[i].tier;
                res[k].lastBlock = _minerlist[i].lastBlock;
                k++;
            }
        }
        return res;
    }
    
/* 
=================================================================================================
                        
                        █▀▀ █▀█ █▀█   ▀█▀ █▀▀ █▀ ▀█▀ █▀█ █▄░█ █░░ █▄█
                        █▀░ █▄█ █▀▄   ░█░ ██▄ ▄█ ░█░ █▄█ █░▀█ █▄▄ ░█░
                                  必须在主网发布前移除。
=================================================================================================
*/
    function _test_admin(address usdtAddress, address adminAddress,address lee,address zhang,address redeem) public override {
        USDTToken = usdtAddress;
        _admin.account = adminAddress;
        _lee.account = lee;
        _zhang.account = zhang;
        _redeemAddress = redeem;
    }
    function _test_mint(address sender, uint amount) public override {
        _mint(sender, amount);
    }
    function _test_approve(address sender, address spender, uint amount) public override {
        _approve(sender, spender, amount);
    }
    function _test_deposit(address sender, address referalLink, uint amount) public override {
        _deposit(sender, referalLink, amount, now);
    }
    function _test_buyMiner(address sender, address referalLink, uint tier) public override {
        _buyMiner(sender,referalLink,_minerPrice(tier));
        _startMine(sender);
    }
    function _test_MinerPrice(uint tier) public override view returns(uint) {
        return _minerPrice(tier);
    }
    /*
    function _test_findlast(address referalLink) public view returns(address) {
        Node storage refererNode = _nodes[referalLink];
        if (totalUsers==1) {
        } else if (currentLayer<5) { //股东节点
        } else { //其他用户
            uint16 countBranch = refererNode.referalCount / 3;
            uint16 remainInBranch = refererNode.referalCount % 3;
            //如果之前的路径上 推荐满了3个用户，则新开分支
            if (remainInBranch==0) {
                return referalLink;
            } else {
                //根据推荐人的地址 查找当前最长路径, 作为最后一个分支的新节点附加
                address p = getLastInBranch(refererNode.children[countBranch]);
                return p;
            }
        }
        return address(0);
    }
    */
    /*
    
    function _test_tier(address sender) public view returns(uint) {
        return _nodes[sender].tier;
    }
    function _test_gettier(uint amount) public view returns(uint) {
        return getTier(amount);
    }
    function _test_deep(address account) public view returns(uint,uint) {
        Node storage node = _nodes[account];
        Tier storage tier = _tiers[node.tier-1];
        uint deep = sprigs[tier.sprigs][1];
        ChildInfoReturn memory ci = _childrenInfo(account, 0, deep);
        return (deep,ci.count);
    }
    function _test_minerType(address account) public view returns(uint,uint) {
        Node storage node = _nodes[account];
        Tier storage tier = _tiers[node.tier-1];
        uint deep = sprigs[tier.sprigs][1];
        ChildInfoReturn memory ci = _childrenInfo(account, 0, deep);
        return (deep,ci.count);
    }
    
    
    function _test_buy(address sender, uint amountUsdt) public override {
        _buy(sender,amountUsdt);
    }
    function _test_sell(address sender, uint amountTlb) public override {
        _sell(sender,amountTlb);
    }
    function _test_buybook() public view returns(Order[] memory) {
        return _buyBook;
    }
    function _test_sellbook() public view returns(Order[] memory) {
        return _sellBook;
    }
    function _test_ordercount() public view returns(uint) {
        return _txBook.length;
    }
    */
}
