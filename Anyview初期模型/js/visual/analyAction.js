	//分析数据操作，并选择相应的处理函数
	function analyAction(action ,nowData,beforeData){
		var Action = action.action;		//取出操作数
		//选择不同的处理函数
		switch(Action)
		{
			case "addOne":                  //添加一個結點
				addOne(nowData,beforeData,action);      
				break;
				
			case "listMerge":               //合并两条链表
				listMerge(nowData,beforeData);
				break;
				
			case "gList":                   //g型链表
				gList(nowData,beforeData);
				break;
				
			case "loopList":                //循环链表
				loopList(nowData,beforeData);
				break;
				
			case "yList":                   //y型链表
			    yList(nowData,beforeData);
				break;
				
			case "repainting":              //重画
				repainting(nowData,beforeData);
				break;
				
			case  "tailClear":              //末尾指针删除
				tailClear(nowData,beforeData,action);
				break;
			case  "midClear":               //中间指针删除
				midClear(nowData,beforeData);
				break;	
			case  "selfBefore":
				selfBefore(nowData,beforeData);
				break;
			case  "self":
				selfBefore(nowData,beforeData);
				break;	
			case  "selfAfter":
				selfBefore(nowData,beforeData);
				break;		
			case  "otherNotFirst":
				selfBefore(nowData,beforeData);
				break;	
			case  "otherFirst":
				otherFirst(nowData,beforeData,action);
				break;	
			case  "tailOtherFirst":
				tailOtherFirst(nowData,beforeData,action);
				break;	
			case  "tailOtherNotFirst":
				tailOtherNotFirst(nowData,beforeData,action);
				break;	
			case  "tailSelf":
				tailSelf(nowData,beforeData,action);
				break;	
			case  "treeAddOne":
				treeAddOne(nowData,beforeData,action);
				setTimeOut();
				break;	
			case  "leftSubtreeChange":
				leftSubtreeChange(nowData,beforeData,action);
				setTimeOut();
				break;	
			case  "leftSubtreeMerge":
				leftSubtreeChange(nowData,beforeData,action);
				setTimeOut();
				break;	
			case  "leftSubtreeClear":
				leftSubtreeChange(nowData,beforeData,action);
				setTimeOut();
				break;
			case  "rightSubtreeChange":
				rightSubtreeChange(nowData,beforeData,action);
				setTimeOut();
				break;	
			case  "rightSubtreeMerge":
				rightSubtreeChange(nowData,beforeData,action);
				setTimeOut();
				break;
			case  "rightSubtreeClear":
				rightSubtreeChange(nowData,beforeData,action);
				setTimeOut();
				break;
			case  "leftSubtreeException":
				leftSubtreeException(nowData,beforeData,action);
				setTimeOut();
				break;
			case  "rightSubtreeException":
				rightSubtreeException(nowData,beforeData,action);
				setTimeOut();
				break;
			case "treeRepainting":
				treeRepainting(nowData,beforeData,action);
				break;
			case "pointCreate":
				pointCreate();
				setTimeOut();
				break;
			case "pointDecrease":
				pointCut(changeId,pointId);
				setTimeOut();
				break;
			case "pointMove":
				pointMove(decId,creId,pointId);
				setTimeOut();
				break;
			case "graph":
				graph();
				break;
			
			default:
				//n 与 case 1 和 case 2 不同时执行的代码
		}
	}