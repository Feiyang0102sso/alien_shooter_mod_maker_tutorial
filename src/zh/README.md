---
home: true
icon: home
comment: false
title: 主页
heroImage: /as_main.png
heroImageStyle:  
  border-radius: 20%
  border: "5px solid rgba(255, 255, 255, 0.3)"
  box-shadow: "0 0 12px rgba(0, 0, 0, 0.2)"
  backdrop-filter: "blur(10px)"
  background: "rgba(255, 255, 255, 0.1)"
bgImage: /assets/image/menu254.png
bgImageStyle:
  background-attachment: fixed
  background-position: center 20%
  filter: brightness(90%)
  background-size: cover
  opacity: 0.5
  
heroFullScreen: true
heroText: 孤胆枪手 MOD 教程
tagline: 从0开始学习制作MOD
actions:
  - text: 工具下载
    icon: circle-down
    link: ./download/
    type: primary

#  - text: 社区
#    icon: comment
#    link: ./contribution/
#
#  - text: 赞助
#    icon: hand-holding-heart
#    link: ./contribution/Sponsor


highlights:
#  part1 功能专区
  # 第一行：游戏专区
  - bgImage: /alien_shooter_mod_maker_tutorial/assets/image/menu254.png
    bgImageStyle:
      background-attachment: fixed    
      background-position: center 20%
      opacity: 0.5
      filter: brightness(90%)
      background-size: cover          
    features:
      - title: 孤胆枪手 1
        icon: biohazard
        details: Alien Shooter 1 MOD专区
        link: ./as1/
      - title: 孤胆枪手 2
        icon: skull
        details: Alien Shooter 2 MOD专区
        link: ./as2/
      - title: 僵尸枪手 1
        icon: skull-crossbones
        details: Zombie Shooter 1 MOD专区

  # 第二行：通用文件格式
  - bgImage: /alien_shooter_mod_maker_tutorial/assets/image/menu254.png # 每一块都要写路径，否则下面会变黑
    bgImageStyle:
      background-attachment: fixed
      background-position: center 20%
      opacity: 0.5
      filter: brightness(90%)
      background-size: cover
    features:
      - title: 通用-object.res 文件
        icon: box-archive
        details: 包含游戏内所有对象的数据定义、属性及资源索引
      - title: 通用-.vid 文件
        icon: file-video
        details: 游戏所使用的特定资源格式
        link: ./vid_file/

  # 第三行：待开发专区（同上，重复背景配置...）
  - bgImage: /alien_shooter_mod_maker_tutorial/assets/image/menu254.png
    bgImageStyle:
      background-attachment: fixed
      background-position: center 20%
      opacity: 0.5
      filter: brightness(90%)
      background-size: cover
    features:
      - title: 逆向工程
        icon: microchip
        details: 待开发-试图理解游戏底层
      - title: 手游 MOD
        icon: mobile-screen
        details: 待开发-手游平台-LGD文件解析


  # part2:：Mod 作者专区
  - header: MOD 大神们 （不分先后，如有遗漏还望海涵）
    class: author-section
    bgImage: /alien_shooter_mod_maker_tutorial/assets/image/menu254.png # 必须重复写背景，否则这一块会变黑
    bgImageStyle:
      background-position: center 20%
      opacity: 0.5
      filter: brightness(90%)
      background-size: cover
    
    features:
      - title: 火舞飞炀
#        icon: /assets/image/authors/author1.png # 作者头像路径
#        details: 代表作：<br>AS1 某某 Mod
        details: |
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: -10px;">
            <img src="../assets/image/authors/author1.png" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; 
                border: 3px solid rgba(255, 255, 255, 0.4); margin-bottom: 12px; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <div style="font-size: 0.9rem; opacity: 0.8; line-height: 1.5;">MOD作者 <br> 博客作者</div>
          </div>
        link: https://space.bilibili.com/278060995 # 点击跳转的网址

      - title: ∫☆
        details: |
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: -10px;">
            <img src="../assets/image/authors/author2.jpg" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; 
                border: 3px solid rgba(255, 255, 255, 0.4); margin-bottom: 12px; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <div style="font-size: 0.9rem; opacity: 0.8; line-height: 1.5;">dalao中的dalao <br>BidMod系列作者</div>
          </div>
        link: https://space.bilibili.com/354988212 # 点击跳转的网址

      - title: 97
        details: |
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: -10px;">
            <img src="../assets/image/authors/author3.png" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; 
                border: 3px solid rgba(255, 255, 255, 0.4); margin-bottom: 12px; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <div style="font-size: 0.9rem; opacity: 0.8; line-height: 1.5;">MOD作者</div>
          </div>
        link: https://space.bilibili.com/3546658742733469 # 点击跳转的网址
        
      - title: 未来的白皇
        details: |
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: -10px;">
            <img src="../assets/image/authors/author4.webp" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; 
                border: 3px solid rgba(255, 255, 255, 0.4); margin-bottom: 12px; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <div style="font-size: 0.9rem; opacity: 0.8; line-height: 1.5;">MOD作者</div>
          </div>
        link: https://space.bilibili.com/32516147 # 点击跳转的网址
        
      - title: 50-鱼鸣嘴
        details: |
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: -10px;">
            <img src="../assets/image/authors/author6.png" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; 
                border: 3px solid rgba(255, 255, 255, 0.4); margin-bottom: 12px; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <div style="font-size: 0.9rem; opacity: 0.8; line-height: 1.5;">MOD作者 <br> 教程作者</div>
          </div>
        link: https://space.bilibili.com/315990763 # 点击跳转的网址
        
      - title: 绪山可儿
        details: |
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: -10px;">
            <img src="../assets/image/authors/author5.webp" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; 
                border: 3px solid rgba(255, 255, 255, 0.4); margin-bottom: 12px; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <div style="font-size: 0.9rem; opacity: 0.8; line-height: 1.5;">MOD作者</div>
          </div>
        link: https://space.bilibili.com/325537864 # 点击跳转的网址
        
      - title: 兮城物月
        details: |
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: -10px;">
            <img src="../assets/image/authors/author7.png" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; 
                border: 3px solid rgba(255, 255, 255, 0.4); margin-bottom: 12px; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <div style="font-size: 0.9rem; opacity: 0.8; line-height: 1.5;">MOD作者</div>
          </div>
        link: https://space.bilibili.com/405807258 # 点击跳转的网址
        
      - title: 热爱白嫖的屑用户
        details: |
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: -10px;">
            <img src="../assets/image/authors/author8.png" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; 
                border: 3px solid rgba(255, 255, 255, 0.4); margin-bottom: 12px; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <div style="font-size: 0.9rem; opacity: 0.8; line-height: 1.5;">手游领域大神</div>
          </div>
        link: https://space.bilibili.com/3546879841274299 # 点击跳转的网址
        
      - title: 宝藏神了
        details: |
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: -10px;">
            <img src="../assets/image/authors/author9.png" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; 
                border: 3px solid rgba(255, 255, 255, 0.4); margin-bottom: 12px; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <div style="font-size: 0.9rem; opacity: 0.8; line-height: 1.5;">MOD作者 <br> 教程作者</div>
          </div>
        link: https://space.bilibili.com/1399191416 # 点击跳转的网址
        


---