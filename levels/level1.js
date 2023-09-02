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
        //new Barrier(200,0,200,480,0),
        //new Barrier(600,0,200,480,1),
        //new Barrier(800,0,200,480,2),
        
    ],
    [   // enemies
        //new Pufferfish(600,100,80,80,'green'),
        //new Pufferfish(900,200,80,80,'orange'),
        //new Pufferfish(1000,300,80,80,'red'),

        //new Jellyfish(1200,200,80,80,'normal'),
        //new Jellyfish(1800,150,80,80,'toxic'),
    ],
    [
        new CollectableObject (350,200,40,40,'coin'),
        new CollectableObject (300,200,60,60,'poison'),
    ],
    3500,
    600
);