---
title: 脚本基础-等效代码
author: 火舞飞炀
icon: code-compare
date: 2026-01-16
order: 7
---

这部分将讲一些和游戏内指令或任务编辑器设置相等效的基础lgc代码

## ACT_SCRIPT_VAR

``` c#
iff(SizeTo(Flagman(0), 8963, 425) < 300){ //任意判断条件 if或iff视情况而定
    Action10 == 2; //等效于编辑器内指令 ACT_SCRIPT_VAR 10 2 0
}
```

## ACT_WHILE_NOT_SCRIPT_VAR

```c#
//if或iff视情况而定 进行以此判断还是多次判断 
//等效于编辑器内指令 ACT_WHILE_NOT_SCRIPT_VAR 10 2 0
iff(Action10 == 2){ 
    //任意代码 
}
```

## ACT_SET_QUEST

```c#
SendCommand( EXT_SETQUESTSTATE, 1, 10, QS_BEGUN );
//等效于ACT_SET_QUEST 1 10 0
```

## ACT_WHILE_NOT_QUEST

== 注意！这行代码在征兵中无效！==

==征兵中只能接受形如Action10 == 2这种，可参考 征兵level06.lgc==

需要你单独在编辑器中进行额外一些指令设置，诸如

ACT_WHILE_NOT_QUEST 1 10 0

ACT_SCRIPT_VAR 11 1 0

然后再调用 iff(Action11 == 1)

```c#
//等效于 ACT_WHILE_NOT_QUEST 1 10 0
//注意后两个参数是相反的
iff( SendCommand( EXT_GETQUESTSSTATE, 0, 10, 1 ) & QS_BEGUN ){
    //任意代码
}
```

## 击杀所有mX命名的怪物 / 物品

```c#
//等效于任务编辑器中设置杀光所有m1命名的怪后做某事
iff(SendCommand(EXT_GetNamedMonst, 1) == 0){// 任意代码
		Action14 = 1;
}
```

## 给予玩家某物

``` c#
//给予玩家一个炸弹 Obj_dynamite 是定义在weap.cfg中的名字，可进行任意替换
//比如武器，弹药，其他游戏道具
SendCommandA( -1, EXT_ADDITEMBYBASEID, SendCommandC( EXT_GetIdByName, "Obj_dynamite" ) );
```

## 移除玩家某物

``` c++
//若玩家有炸弹，则移除一个炸弹
//ITM_DYNAMITE 是定义在 iRPGBaseObjectConst.h 中的常量，代指炸弹
//更多有关ITM_XXXX的常量列在下面
SendCommandA( -1, EXT_REMOVEITEMIFHAS, ITM_DYNAMITE );
```

``` c#
//需要这些常量来避免与对象名称绑定
#define ITM_NONE           0
#define ITM_FLASH          1
#define ITM_DRONE          2
#define ITM_DRONE2         3
#define ITM_NVISN          4
#define ITM_INVULN         5
#define ITM_GRENADE        6
#define ITM_RADAR          7
#define ITM_TANKSHELL      8
#define ITM_MEDKIT         9
#define ITM_DYNAMITE       10
#define ITM_BACKPACK       11
```

```c#
//官方还用过一个类似的代码，不过似乎没什么作用。不排除是我用的不对
//所以估计只能移除上面列过的定义好的items
//除了能移除炸弹，其他也没什么用途
SendCommandA( -1, EXT_REMOVEITEMIFHAS, SendCommandC( EXT_GetIdByName, "Obj_personalkey" ) );
```

