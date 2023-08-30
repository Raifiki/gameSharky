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
    [
        //new Barrier(200,0,500,480,0),
        //new Barrier(1600,200,800,200,1),
    ],
    [   // enemies
        //new Pufferfish(400,200,100,100),
        //new Pufferfish(600,300,100,100),
        //new Pufferfish(800,250,100,100),

        //new Jellyfish(700,200,100,100),
        new Jellyfish(500,150,100,100),
        //new Jellyfish(1000,100,100,100),

        //new Endboss (800,50,300,300),
    ],
    [
        new CollectableObject (350,200,30,30,'coin'),
        new CollectableObject (300,200,50,50,'poison'),
    ],
    3500,
    800
);