const LEVEL_1 = new Level( 
    { // Background: Images + small fishes
        Img1:[
            './img/03_Background/Layers/5_Water/D1.png',
            './img/03_Background/Layers/4_Fondo2/D1.png',
            './img/03_Background/Layers/3_Fondo1/D1.png',
            './img/03_Background/Layers/2_Floor/D1.png',
            './img/03_Background/Layers/1_Light/1.png',
        ],
        Img2:[
            './img/03_Background/Layers/5_Water/D2.png',
            './img/03_Background/Layers/4_Fondo2/D2.png',
            './img/03_Background/Layers/3_Fondo1/D2.png',
            './img/03_Background/Layers/2_Floor/D2.png',
            './img/03_Background/Layers/1_Light/2.png',
        ],
        animated:[

        ]
    },
    [],
    [   // enemies
        new Pufferfish(200,200,100,100),
        new Pufferfish(600,300,100,100),
        new Pufferfish(800,250,100,100),

        new Jellyfish(300,350,100,100),
        new Jellyfish(500,150,100,100),
        new Jellyfish(1000,100,100,100),

        new Endboss (1000,50,300,300),
    ],
    [],
    3500,
    480
);