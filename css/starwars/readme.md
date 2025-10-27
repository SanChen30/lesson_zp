# css3星球大战

## 前端是代码界的导演

1. css4 已经有了
2. html 结构，标签写好，语义化
  - 盒子
  - star wars 更像图片
  - 电影标题 h2 比较合语义
  - span13个？ 需求，每个字母要旋转

3. 水平垂直居中
  - 绝对定位 position: absolute;
    - 如果外层有position:relative; 就相对于外层居中
    - 如果外层没有position:relative; 就相对于body居中

4. em单位是相对于当前元素的字体大小，而不是根元素

5. transform 属性

CSS transform属性允许我们对元素进行旋转、缩放、倾斜或平移，是实现现代网页动画和交互效果的重要工具。

1) 平移变换 (Translate)
```css
/* 水平平移 */
transform: translateX(50px);

/* 垂直平移 */
transform: translateY(30px);

/* 同时水平和垂直平移 */
transform: translate(50px, 30px);
```
2) 旋转变换 (Rotate)
```css
/* 顺时针旋转45度 */
transform: rotate(45deg);

/* 逆时针旋转30度 */
transform: rotate(-30deg);
```
3) 缩放变换 (Scale)     
```css
/* 等比例放大1.5倍 */
transform: scale(1.5);

/* 水平方向放大1.5倍 */
transform: scaleX(1.5);

/* 垂直方向放大1.5倍 */
transform: scaleY(1.5);

/* 水平放大1.5倍，垂直缩小0.8倍 */
transform: scale(1.5, 0.8);
```
4) 倾斜变换 (Skew)
```css
/* 水平倾斜20度 */
transform: skewX(20deg);

/* 垂直倾斜15度 */
transform: skewY(15deg);

/* 同时水平和垂直倾斜 */
transform: skew(20deg, 15deg);
```
5) 3D变换
```css
/* 绕X轴旋转 */
transform: rotateX(45deg);

/* 绕Y轴旋转 */
transform: rotateY(45deg);

/* 绕Z轴旋转（等同于rotate） */
transform: rotateZ(45deg);

/* 3D透视效果 */
transform: perspective(500px) rotateY(45deg);
``` 
6) 多重变换
```css
/* 同时应用多个变换 */
transform: translate(50px, 30px) rotate(45deg) scale(1.2);
```
6. transform-origin属性

用于设置变换的原点：

```css
/* 默认值，中心点 */
transform-origin: center;

/* 左上角 */
transform-origin: left top;

/* 自定义位置 */
transform-origin: 20px 30px;

/* 3D变换原点 */
transform-origin: 50% 50% 0;
```
7. 透视距离 (perspective)

定义3D元素的透视效果，模拟人眼观看3D物体的视觉效果。

取值和效果：

数值：表示视点到z=0平面的距离
值越小：透视效果越强（类似广角镜头）
值越大：透视效果越弱（类似长焦镜头）

8. transform-style属性

用于指定3D变换是否保持子元素的3D效果：

```css
/* 默认值，子元素不保持3D效果 */
transform-style: flat;

/* 子元素保持3D效果 */
transform-style: preserve-3d;
```

9. 动画属性 (animation)

```css
animation: star 10s linear infinite;
```

用于定义元素的动画效果，包括动画名称、时长、时间函数、重复次数等。

取值和效果：

1) animation-name：指定动画名称，与@keyframes规则中的名称一致。
2) animation-duration：指定动画时长，单位秒或毫秒。
3) animation-timing-function：指定时间函数，控制动画速度变化，如linear、ease、ease-in-out等。
- linear;      /* 匀速 */
- ease;        /* 默认，慢-快-慢 */
- ease-in;     /* 慢开始 */
- ease-out;    /* 慢结束 */
- ease-in-out; /* 慢开始和结束 */
- cubic-bezier(0.1, 0.7, 1.0, 0.1); /* 贝塞尔曲线 */
4) animation-iteration-count：指定重复次数，infinite表示无限循环。
