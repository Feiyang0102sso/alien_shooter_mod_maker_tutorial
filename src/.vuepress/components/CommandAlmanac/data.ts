// components/Almanac/data.ts

export interface GameVersion {
    id: string;
    name: string;
    icon: string;
}

export interface CommandParam {
    name: string;
    desc: { zh: string; en: string };
}

export interface GalleryItem {
    src: string;
    caption: { zh: string; en: string };
}

export interface GameCommand {
    id: string;
    description: { zh: string; en: string };
    supportedVersions: string[];
    params: CommandParam[];
    remarks?: { zh: string[]; en: string[] };
    example?: string;
    gallery?: GalleryItem[]; // 新增的画廊字段
}

// === 1. 版本配置 ===
export const versions: GameVersion[] = [
    { id: 'as1', name: 'Alien Shooter 1', icon: 'as1_ico.png' },
    { id: 'as2', name: 'Alien Shooter 2', icon: 'as2_ico.png' },
];

export const commands: GameCommand[] = [
    {
        id: 'ACT_MOVE',
        description: { zh: '使所选对象移动。', en: 'Makes the selected object move.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '目标位置 X 轴坐标', en: 'Target X' } },
            { name: 'Var 2', desc: { zh: '目标位置 Y 轴坐标', en: 'Target Y' } },
            { name: 'Var 3', desc: { zh: '目标位置 Z 轴坐标', en: 'Target Z' } }
        ],
        remarks: {
            zh: ['选中对象，右键目的地即可创建，每个目的地会有递减序列号','轨迹在编辑器中以绿线表示。', '若所选对象本身不可移动，则此命令无效。'],
            en: ['Path shown as green line.', 'Invalid if object is immovable.']
        },
        // example: 'ACT_MOVE (In Editor)',
        gallery: [
            {
                src: 'move1.png',
                caption: { zh: '运动路径将以绿色展示', en: 'Drawing path in editor' }
            },
            {
                src: 'move2.gif',
                caption: { zh: '运动指令演示', en: 'Drawing path in editor' }
            }
        ]
    },
    {
        id: 'ACT_MOVE_ACCURATELY',
        description: { zh: '使所选对象精确移动到某一点。', en: 'Move accurately to a point.' },
        supportedVersions: ['as2'],
        params: [
            { name: 'Var 1', desc: { zh: '目标位置 X 轴坐标', en: 'Target X' } },
            { name: 'Var 2', desc: { zh: '目标位置 Y 轴坐标', en: 'Target Y' } },
            { name: 'Var 3', desc: { zh: '目标位置 Z 轴坐标', en: 'Target Z' } }
        ],
        remarks: {
            zh: ['此命令需要在绘制对象运动轨迹后手动在属性窗口修改。', '轨迹在编辑器中以绿线表示。'],
            en: ['Must be edited manually in properties window.', 'Path shown as green line.']
        },
        gallery: [
            {
                src: 'move_ac1.gif',
                caption: { zh: '一般move，有偏移', en: 'Drawing path in editor' }
            },
            {
                src: 'move_ac2.gif',
                caption: { zh: '精准move，直接走到光晕中心', en: 'Drawing path in editor' }
            }
        ]
    },
    {
        id: 'ACT_STAND_FIRM',
        description: { zh: '使所选对象精确移动到某一点后保持不动。', en: 'Move and stand firm.' },
        supportedVersions: [ 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '目标位置 X 轴坐标', en: 'Target X' } },
            { name: 'Var 2', desc: { zh: '目标位置 Y 轴坐标', en: 'Target Y' } },
            { name: 'Var 3', desc: { zh: '目标位置 Z 轴坐标', en: 'Target Z' } }
        ],
        remarks: {
            zh: ['让对象呆在原位，推动他后也会移动回原位'],
            en: ['Must be edited manually in properties window.', 'Path shown as green line.']
        },
        gallery: [
            {
                src: 'stand_firm1.gif',
                caption: { zh: '右侧士兵添加了stand_firm, 他在战斗时不会乱动', en: 'Drawing path in editor' }
            }
        ]
    },

    {
        id: 'ACT_ATTACK',
        description: { zh: '使所选对象攻击另一对象。', en: 'Attack another object.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '一串大整数 (目标ID)', en: 'Target ID' } },
            { name: 'Var 2', desc: { zh: '-', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['单击鼠标要攻击的对象右键自动创建','行踪在编辑器中以红线表示。',
                '一般用于unit对象攻击unit对象','若两者类型不一样则需要进行类型转换'],
            en: ['Shown as red line.']
        },
        gallery: [
            {
                src: 'attack1.png',
                caption: { zh: '攻击路径将以红色展示', en: 'Drawing path in editor' }
            },
            {
                src: 'attack2.gif',
                caption: { zh: '攻击指令演示', en: 'Drawing path in editor' }
            }
        ]
    },
    {
        id: 'ACT_COOR_ATTACK',
        description: { zh: '使所选对象向某一点发起攻击。', en: 'Attack towards a point.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '目标 X 坐标', en: 'Target X' } },
            { name: 'Var 2', desc: { zh: '目标 Y 坐标', en: 'Target Y' } },
            { name: 'Var 3', desc: { zh: '目标 Z 坐标', en: 'Target Z' } }
        ],
        remarks: {
            zh: ['此命令需要在绘制对象运动轨迹后手动在属性窗口修改','行踪在编辑器中以蓝线表示','只会攻击该坐标一次'],
            en: ['Shown as blue line.']
        },
        gallery: [
            {
                src: 'attack_cor1.png',
                caption: { zh: '坐标攻击路径将以蓝色展示', en: 'Drawing path in editor' }
            },
        ]
    },
    {
        id: 'ACT_CHANGE_COOR',
        description: { zh: '使所选对象发生位移 (瞬移)。', en: 'Teleport object.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '目标 X 坐标', en: 'Target X' } },
            { name: 'Var 2', desc: { zh: '目标 Y 坐标', en: 'Target Y' } },
            { name: 'Var 3', desc: { zh: '目标 Z 坐标', en: 'Target Z' } }
        ],
        remarks: {
            zh: ['行踪在编辑器中以浅绿线表示。','一般用于传送npc,道具等'],
            en: ['Shown as light green line.']
        },
        gallery: [
            {
                src: 'change_cor1.png',
                caption: { zh: '坐标攻击路径将以浅绿色展示', en: 'Drawing path in editor' }
            },
            {
                src: 'change_cor2.gif',
                caption: { zh: '瞬移效果展示', en: 'Drawing path in editor' }
            }
        ]
    },
    {
        id: 'ACT_SET_GOAL_FOR_TELEPORT',
        description: { zh: '传送玩家到某一位置。', en: 'Teleport player.' },
        supportedVersions: ['as2'],
        params: [
            { name: 'Var 1', desc: { zh: '目标 X 坐标', en: 'Target X' } },
            { name: 'Var 2', desc: { zh: '目标 Y 坐标', en: 'Target Y' } },
            { name: 'Var 3', desc: { zh: '目标 Z 坐标', en: 'Target Z' } }
        ],
        remarks: {
            zh: ['传送路径在编辑器中以灰线表示。', '仅对玩家有效。', '一般与script_event13配合使用'],
            en: ['Shown as grey line.', 'Only for player.']
        },
        gallery: [
            {
                src: 'goal_teleport1.png',
                caption: { zh: '玩家传送路径将以灰色展示', en: 'Drawing path in editor' }
            },
        ]
    },
    // 2026 0206 新增 事件触发类
    {
        id: 'ACT_FOLLOW',
        description: { zh: '使所选对象跟随玩家或某一对象', en: 'Make the selected object follow the player.' },
        supportedVersions: ['as2'],
        params: [
            { name: 'Var 1', desc: { zh: '默认0跟随玩家。也可右键另一对象，使目标跟随该对象', en: '-' } },
            { name: 'Var 2', desc: { zh: '-', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['若所选对象本身不可移动，则此命令无效。','跟随其他对象的ID属性参考Attack指令'],
            en: ['If the selected object itself is immovable, this command is invalid.']
        },
        gallery: [
            { src: 'follow1.png', caption: { zh: 'follow行踪将以红线表示', en: 'Demo Image 1' } },
            { src: 'follow2.gif', caption: { zh: '演示 小蜘蛛跟随大蜘蛛', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_STOP',
        description: { zh: '使所选对象停止移动以及一切当前动画', en: 'Make the selected object stop moving.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '-', en: '-' } },
            { name: 'Var 2', desc: { zh: '-', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['走着走着突然立正，字面意思'],
            en: []
        },
        // gallery: [
        //     { src: '', caption: { zh: '演示图片 1', en: 'Demo Image 1' } },
        //     { src: '', caption: { zh: '演示图片 2', en: 'Demo Image 2' } }
        // ]
    },
    {
        id: 'ACT_ROTATE',
        description: { zh: '使对象旋转到指定角度。', en: 'Rotate the object to a specified angle.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '目标角度', en: 'Target Angle' } },
            { name: 'Var 2', desc: { zh: '-', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['编辑器中角度以顺时针为正向', '12 点方向为 0 度', '3 点方向为 64 度', '以此类推，最大角度为 255'],
            en: ['Angles are clockwise.', '12 o\'clock is 0.', '3 o\'clock is 64.', 'Max angle is 255.']
        },
        gallery: [
            { src: 'rotate1.png', caption: { zh: '旋转指令', en: 'Demo Image 1' } },
            { src: 'rotate2.gif', caption: { zh: '旋转演示', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_PAUSE',
        description: { zh: '延时命令。', en: 'Delay command.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '固定等待时间 (毫秒)', en: 'Wait time (ms)' } },
            { name: 'Var 2', desc: { zh: '随机延长时间 (最大不超过)', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['var1 + Random(var2)', '添加该命令后，对象下方会出现跳动的“P”符号。', '更确切地说p符号是显示在被调用的位置'],
            en: ['Unit is milliseconds.', 'A jumping "P" symbol will appear under the object.']
        },
        gallery: [
            { src: 'pause1.png', caption: { zh: '闪烁的p符号，与move指令配合使用', en: 'Demo Image 1' } },
            // { src: '', caption: { zh: '演示图片 2', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_DAMAGE',
        description: { zh: '使对象造成伤害。', en: 'Cause damage to the object.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '对单位造成的伤害', en: 'Unknown' } },
            { name: 'Var 2', desc: { zh: '未知？造成损坏的单位，如果返回1则无需维修', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: [],
            en: []
        },
        gallery: [
            // { src: '', caption: { zh: '演示图片 1', en: 'Demo Image 1' } },
            // { src: '', caption: { zh: '演示图片 2', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ANI_*',
        description: { zh: '调用对应动画。', en: 'Display animation.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '默认0，(或可选-对应对象编号)', en: '-' } },
            { name: 'Var 2', desc: { zh: '默认0，(或可选-对应对象X坐标)', en: '-' } },
            { name: 'Var 3', desc: { zh: '默认0，(或可选-对应对象Y坐标)', en: '-' } }
        ],
        remarks: {
            zh: ['默认直接对Unit单位使用，可忽略参数', '也可通过脚本触发器触发，则需要按需填入vid编号和X,Y坐标'],
            en: ['E.g., for Nicholas typing, use ANI_STAND_OPEN.', 'To make a character die, use ANI_DEATH.']
        },
        gallery: [
            { src: 'ani1.png', caption: { zh: '一般情况，直接对unit对象使用', en: 'Demo Image 1' } },
            { src: 'ani2.png', caption: { zh: '也可通过脚本触发器，指定一个对象触发,此处为让位于 (431,296) 处的unit-1155死亡', en: 'Demo Image 2' } },
            { src: 'ani3.gif', caption: { zh: '演示效果', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_SET_DIALOG',
        description: { zh: '显示对话。', en: 'Display dialog.' },
        supportedVersions: ['as2'],
        params: [
            { name: 'Var 1', desc: { zh: '对话编号', en: 'Dialog ID' } },
            { name: 'Var 2', desc: { zh: '对话编号', en: 'Dialog ID' } },
            { name: 'Var 3', desc: { zh: '对话编号', en: 'Dialog ID' } }
        ],
        remarks: {
            zh: ['具体编号请查阅 dialog.txt 文件。'],
            en: ['Please refer to dialog.txt for IDs.']
        },
        gallery: [
            // { src: '', caption: { zh: '演示图片 1', en: 'Demo Image 1' } },
            // { src: '', caption: { zh: '演示图片 2', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_SET_FLAGMAN_DIALOG',
        description: { zh: '在玩家或其他unit上方显示提示语。', en: 'Show a tip above the player.' },
        supportedVersions: [ 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '对话编号', en: 'Dialog ID' } },
            { name: 'Var 2', desc: { zh: '对话编号', en: 'Dialog ID' } },
            { name: 'Var 3', desc: { zh: '对话编号', en: 'Dialog ID' } }
        ],
        remarks: {
            zh: ['具体编号请查阅 dialog.txt 文件。'],
            en: ['Please refer to dialog.txt for IDs.']
        },
        gallery: [
            // { src: '', caption: { zh: '演示图片 1', en: 'Demo Image 1' } },
            // { src: '', caption: { zh: '演示图片 2', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_SET_BEHAVE',
        description: { zh: '设置所选对象行为。', en: 'Set behavior of selected object.' },
        supportedVersions: ['as2'],
        params: [
            { name: 'Var 1', desc: { zh: '是否会攻击 (0或1)', en: 'Will Attack (0 or 1)' } },
            { name: 'Var 2', desc: { zh: '是否会移动 (0或1)', en: 'Will Move (0 or 1)' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['此命令仅适用于 Unit 类别构件。', '属性 1、2 的取值均为 0 或 1。',
                '比如说某个NPC要移动到指定位置，为了防止他追着怪打，可将其Behave设置为1,0'],
            en: ['Only applies to Unit class objects.', 'Values correspond to 0 or 1.']
        },
        gallery: [
            // { src: '', caption: { zh: '演示图片 1', en: 'Demo Image 1' } },
            // { src: '', caption: { zh: '演示图片 2', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_SET_HP',
        description: { zh: '设置所选对象生命值。', en: 'Set HP of selected object.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '对象生命值，字面值', en: 'Object HP' } },
            { name: 'Var 2', desc: { zh: '对象生命值，百分比形式', en: 'Object HP' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['不清楚var1,var2是否可以同时使用'],
            en: ['This command has two properties; the difference is unclear.']
        },
        gallery: [
            // { src: '', caption: { zh: '演示图片 1', en: 'Demo Image 1' } },
            // { src: '', caption: { zh: '演示图片 2', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_SET_DEATH_TIMER',
        description: { zh: '设置所选对象生命周期。', en: 'Set object lifecycle timer.' },
        supportedVersions: ['as2'],
        params: [
            { name: 'Var 1', desc: { zh: '时长 (毫秒)。若为 999999 则关闭计时器', en: 'Duration (ms)' } },
            { name: 'Var 2', desc: { zh: '-', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['单位为毫秒。', '时间到后该对象将死亡或消失。'],
            en: ['Unit is milliseconds.', 'Object will die or disappear after time is up.']
        },
        gallery: [
            // { src: '', caption: { zh: '演示图片 1', en: 'Demo Image 1' } },
            // { src: '', caption: { zh: '演示图片 2', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_SET_INVISIBLE',
        description: { zh: '设置所选对象可见性。', en: 'Set object visibility.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '是否不可见 (1=不可见, 0=可见)', en: 'Is Invisible (1=True, 0=False)' } },
            { name: 'Var 2', desc: { zh: '未知 (一般取0)', en: 'Unknown (Usually 0)' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['字面意思'],
            en: ['Prop 1: 1 = Invisible, 0 = Visible.', 'Prop 2 is usually 0.']
        },
        gallery: [
            // { src: '', caption: { zh: '演示图片 1', en: 'Demo Image 1' } },
            // { src: '', caption: { zh: '演示图片 2', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_SET_UPLINK',
        description: { zh: '设置所选对象与另一对象之间的关联。', en: 'Link selected object to another.' },
        supportedVersions: [ 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '一串大整数 (关联ID)', en: 'Large Integer (Link ID)' } },
            { name: 'Var 2', desc: { zh: '-', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['让被链接的两者同生共死', '该属性添加方法与 ACT_ATTACK 类似，设置完成后在属性窗口修改命令为 ACT_SET_UPLINK 即可。', '常用于链接红色箭头(提示)与隐藏点'],
            en: ['Add method similar to ACT_ATTACK; change command to UPLINK after setting.', 'Used for various game markers.']
        },
        gallery: [
            { src: 'up_link1.png', caption: { zh: '链接路径将以黄线展示', en: 'Demo Image 1' } },
            // { src: '', caption: { zh: '演示图片 2', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_CHANGE_VID',
        description: { zh: '对象替换命令。', en: 'Object replacement command.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '新构件编号', en: 'New Unit ID' } },
            { name: 'Var 2', desc: { zh: '新构建对应动画，若为-1则动画不切换', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['常用于友军、计算机、指示灯等状态的变化。'],
            en: ['Used for state changes in friendly units, computers, lights, etc.']
        },
        gallery: [
            { src: 'change_vid1.png', caption: { zh: '将1160转换为1155并调用死亡动画', en: 'Demo Image 1' } },
            { src: 'change_vid2.gif', caption: { zh: '演示，将1160转换为1155并调用死亡动画', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_PLAY_SFX',
        description: { zh: '播放指定声音。', en: 'Play specified sound.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '声音编号', en: 'Sound ID' } },
            { name: 'Var 2', desc: { zh: '-', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['具体编号请参考对res文件捷豹后的sfx.ini'],
            en: ['Refer to existing maps and dialog.txt for IDs.']
        },
        gallery: [
            // { src: '', caption: { zh: '演示图片 1', en: 'Demo Image 1' } },
            // { src: '', caption: { zh: '演示图片 2', en: 'Demo Image 2' } }
        ]
    },
    {
        id: 'ACT_RANDOM',
        description: { zh: '随即转动？未知', en: 'Rotate the object to a specified angle.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '-', en: 'Target Angle' } },
            { name: 'Var 2', desc: { zh: '-', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['要么用激光，要么直接转过头去，要么什么都不做。'],
            en: ['Angles are clockwise.', '12 o\'clock is 0.', '3 o\'clock is 64.', 'Max angle is 255.']
        },
        gallery: [
            // { src: 'rotate1.png', caption: { zh: '旋转指令', en: 'Demo Image 1' } },
            // { src: 'rotate2.gif', caption: { zh: '旋转演示', en: 'Demo Image 2' } }
        ]
    },
    //行为控制类
    {
        id: 'ACT_FLAGMAN_TRIGGER',
        description: { zh: '区域触发器：当玩家进入指定区域后继续执行后续命令。', en: 'Area trigger: Continue executing subsequent commands after the player enters the specified area.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '区域中心点坐标1', en: 'Area center point coordinate 1' } },
            { name: 'Var 2', desc: { zh: '区域中心点坐标2', en: 'Area center point coordinate 2' } },
            { name: 'Var 3', desc: { zh: '区域半径', en: 'Area radius' } }
        ],
        remarks: {
            zh: ['触发区域在编辑器以圆圈表示。'],
            en: ['The trigger area is represented by a circle in the editor.']
        },
        gallery: [
            { src: 'flagman_trigger1.png', caption: { zh: '触发圈将以白色展示', en: 'Placeholder 1' } },
            // { src: 'placeholder2.png', caption: { zh: '占位图2', en: 'Placeholder 2' } }
        ]
    },
    {
        id: 'ACT_SET_QUEST',
        description: { zh: '触发新任务。', en: 'Trigger a new quest.' },
        supportedVersions: [ 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '任务编号', en: 'Quest ID' } },
            { name: 'Var 2', desc: { zh: '任务编号', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: [
                '任务编号请按“Q”键查看，或直接在 levels.cfg 中查看。',
                '地图已使用的任务编号可以在“File -> Map Info”中，或直接按“I”查看。',
                '更多信息请参考 孤胆枪手2-任务编辑器 章节',
            ],
            en: [
                'Check quest numbers via "Q" key or in levels.cfg.',
                'Used quest numbers can be found in "File -> Map Info" or by pressing "I".'
            ]
        },
        gallery: [
            // { src: 'placeholder1.png', caption: { zh: '占位图1', en: 'Placeholder 1' } },
            // { src: 'placeholder2.png', caption: { zh: '占位图2', en: 'Placeholder 2' } }
        ]
    },
    {
        id: 'ACT_WHILE_NOT_QUEST',
        description: { zh: '任务条件触发：当指定任务完成后继续执行后续命令。', en: 'Quest condition trigger: Continue subsequent commands after the specified quest is completed.' },
        supportedVersions: ['as2'],
        params: [
            { name: 'Var 1', desc: { zh: '任务编号', en: 'Quest ID' } },
            { name: 'Var 2', desc: { zh: '任务编号', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: [
                '属性1-3均为任务编号相关参数。',
                '地图已使用的任务编号可以在“File -> Map Info”中，或直接按“I”查看。',
                '更多信息请参考 孤胆枪手2-任务编辑器 章节'
            ],
            en: [
                'Properties 1-3 are related to Quest ID.',
                'Used quest numbers can be found in "File -> Map Info" or by pressing "I".'
            ]
        },
        gallery: [
            // { src: 'placeholder1.png', caption: { zh: '占位图1', en: 'Placeholder 1' } },
            // { src: 'placeholder2.png', caption: { zh: '占位图2', en: 'Placeholder 2' } }
        ]
    },
    {
        id: 'ACT_SCRIPT_VAR',
        description: { zh: '触发事件（设置脚本变量）。', en: 'Trigger event (Set script variable).' },
        supportedVersions: [ 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '事件编号', en: 'Event ID' } },
            { name: 'Var 2', desc: { zh: '时间编号', en: '-' } },
            { name: 'Var 3', desc: { zh: '通常取0', en: 'Usually 0' } }
        ],
        remarks: {
            zh: [
                '属性1取值为1-9时代表执行游戏内置事件。',
                '属性1取值为10-20时代表用户自定义事件。',
                '地图已使用的事件编号可以在“File -> Map Info”中，或直接按“I”查看。'
            ],
            en: [
                'Var 1 (1-9): Built-in game events.',
                'Var 1 (10-20): User-defined events.',
                'Check used event IDs in "File -> Map Info" or press "I".'
            ]
        },
        gallery: [
            { src: 'script_var.png', caption: { zh: '属性值参考', en: 'Placeholder 1' } },
            // { src: 'placeholder2.png', caption: { zh: '占位图2', en: 'Placeholder 2' } }
        ]
    },
    {
        id: 'ACT_WHILE_NOT_SCRIPT_VAR',
        description: { zh: '事件条件触发：当指定事件触发后继续执行后续命令。', en: 'Event condition trigger: Continue subsequent commands after the specified event is triggered.' },
        supportedVersions: [ 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '事件编号', en: 'Event ID' } },
            { name: 'Var 2', desc: { zh: '事件编号', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['地图已使用的事件编号可以在“File -> Map Info”中，或直接按“I”查看。'],
            en: ['Check used event IDs in "File -> Map Info" or press "I".']
        },
        gallery: [
            { src: 'script_var.png', caption: { zh: 'script_var.png', en: 'Placeholder 1' } },
            // { src: 'placeholder2.png', caption: { zh: '占位图2', en: 'Placeholder 2' } }
        ]
    },
    {
        id: 'ACT_SCRIPT_EVENT',
        description: { zh: '触发特定事件，如传送玩家、操纵固定机枪等。', en: 'Trigger specific events, such as teleporting player or operating fixed machine guns.' },
        supportedVersions: [ 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '事件编号', en: 'Event ID' } },
            { name: 'Var 2', desc: { zh: '视事件类型而定', en: 'Depends on event type' } },
            { name: 'Var 3', desc: { zh: '视事件类型而定', en: 'Depends on event type' } }
        ],
        remarks: {
            zh: ['具体的属性2、3含义需参考对应的事件类型定义。'],
            en: ['The specific meanings of Var 2 and 3 depend on the event type definition.']
        },
        gallery: [
            { src: 'script_event.png', caption: { zh: '属性参考表', en: 'Placeholder 1' } },
            // { src: 'placeholder2.png', caption: { zh: '占位图2', en: 'Placeholder 2' } }
        ]
    },

    //逻辑控制类
    {
        id: 'ACT_BUILD_UNIT',
        description: { zh: '生成一个新对象。', en: 'Create a new object.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '新构件编号', en: 'New component/unit ID' } },
            { name: 'Var 2', desc: { zh: 'X坐标（负值-x表示在周围x像素随机生成）', en: 'X coordinate (negative -x for random spawn within x pixels)' } },
            { name: 'Var 3', desc: { zh: 'Y坐标（负值-x表示在周围x像素随机生成）', en: 'Y coordinate (negative -x for random spawn within x pixels)' } }
        ],
        remarks: {
            zh: ['属性 2、3 可省略。', '若设为负值，则代表在命令所属对象周围一定范围内随机生成。'],
            en: ['Attributes 2 and 3 can be omitted.', 'Negative values indicate random generation within a range around the command owner.']
        },
        gallery: [
            { src: 'build1.png', caption: { zh: '若参数2,3位复数，传送器周围会有红框展示生成范围', en: 'Placeholder 1' } },
            { src: 'build2.gif', caption: { zh: '演示图', en: 'Placeholder 2' } }
        ]
    },
    {
        id: 'ACT_DESTROY_UNIT',
        description: { zh: '使对象消失。', en: 'Destroy an object.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '构件编号', en: 'Component ID' } },
            { name: 'Var 2', desc: { zh: 'X坐标', en: 'X coordinate' } },
            { name: 'Var 3', desc: { zh: 'Y坐标', en: 'Y coordinate' } }
        ],
        remarks: {
            zh: ['若属性 1 取值 -1，属性 2、3 取 0，则代表使该命令所属对象本身消失。'],
            en: ['If Var 1 is -1 and Var 2/3 are 0, the object owning the command itself will disappear.']
        },
        gallery: [
            // { src: 'placeholder1.png', caption: { zh: '占位图1', en: 'Placeholder 1' } },
            // { src: 'placeholder2.png', caption: { zh: '占位图2', en: 'Placeholder 2' } }
        ]
    },
    {
        id: 'ACT_STOP_STACK',
        description: { zh: '停止命令执行。', en: 'Stop command execution.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '-', en: '-' } },
            { name: 'Var 2', desc: { zh: '-', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['与怪物生成器配合，在最后一条 ACT_BUILD_UNIT 命令之后添加此命令。',
                '刷怪类触发必须要有此行指令，否则运行游戏是会自动生成在第一行',
                '在此条指令之后仍可以插入指令，比如MOVE指令，代表对所有生成出来的Unit进行命令'],
            en: ['Typically used for monster spawners to prevent infinite spawning; add this after the last ACT_BUILD_UNIT command.']
        },
        gallery: [
            { src: 'stop1.png', caption: { zh: '演示 所有刷出的怪都按路径行动并且自动死亡', en: 'Placeholder 1' } },
            { src: 'stop2.gif', caption: { zh: '演示效果', en: 'Placeholder 2' } }
        ]
    },
    {
        id: 'ACT_GOTO_STACK',
        description: { zh: '跳转命令。', en: 'Jump to command.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '目标命令编号', en: 'Target command ID' } },
            { name: 'Var 2', desc: { zh: '-', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['用于循环执行某段命令，比如无限刷怪或间隔判定'],
            en: ['Used to create loops for a sequence of commands.']
        },
        gallery: [
            { src: 'goto1.png', caption: { zh: '循环演示', en: 'Placeholder 1' } },
            // { src: 'placeholder2.png', caption: { zh: '占位图2', en: 'Placeholder 2' } }
        ]
    },
    {
        id: 'ACT_CLEAR_STACK',
        description: { zh: '清空指令栈', en: 'Interrupt command execution.' },
        supportedVersions: ['as1', 'as2'],
        params: [
            { name: 'Var 1', desc: { zh: '目标指令栈0-3', en: 'Target command ID' } },
            { name: 'Var 2', desc: { zh: '-', en: '-' } },
            { name: 'Var 3', desc: { zh: '-', en: '-' } }
        ],
        remarks: {
            zh: ['常用于一个触发器对应多个命令栈。用于某一时刻清空特定的指令栈'],
            en: ['All commands following the specified ID will not be executed.']
        },
        gallery: [
            // { src: 'placeholder1.png', caption: { zh: '占位图1', en: 'Placeholder 1' } },
            // { src: 'placeholder2.png', caption: { zh: '占位图2', en: 'Placeholder 2' } }
        ]
    }

];