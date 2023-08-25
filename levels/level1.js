const LEVEL_1 = new Level( 
    { // Background: Images + small fishes
        Img1:[
            new BackgroundObject('./img/03_Background/Layers/5_Water/D1.png',0,canvas_w,canvas_h),
            new BackgroundObject('./img/03_Background/Layers/4_Fondo2/D1.png',0,canvas_w,canvas_h),
            new BackgroundObject('./img/03_Background/Layers/3_Fondo1/D1.png',0,canvas_w,canvas_h),
            new BackgroundObject('./img/03_Background/Layers/2_Floor/D1.png',0,canvas_w,canvas_h),
            new BackgroundObject('./img/03_Background/Layers/1_Light/1.png',0,canvas_w,canvas_h),
        ],
        Img2:[
            new BackgroundObject('./img/03_Background/Layers/5_Water/D2.png',1*(canvas_w-1),canvas_w,canvas_h),
            new BackgroundObject('./img/03_Background/Layers/4_Fondo2/D2.png',1*(canvas_w-1),canvas_w,canvas_h),
            new BackgroundObject('./img/03_Background/Layers/3_Fondo1/D2.png',1*(canvas_w-1),canvas_w,canvas_h),
            new BackgroundObject('./img/03_Background/Layers/2_Floor/D2.png',1*(canvas_w-1),canvas_w,canvas_h),
            new BackgroundObject('./img/03_Background/Layers/1_Light/2.png',1*(canvas_w-1),canvas_w,canvas_h),
        ],
        animated:[

        ]
    },
    [],
    [],
    [],
    1500,
    350
);