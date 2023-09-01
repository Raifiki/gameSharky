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
        new Pufferfish(400,300,80,80,'green'),
        new Pufferfish(500,300,80,80,'orange'),
        new Pufferfish(600,300,80,80,'red'),

        //new Jellyfish(300,200,100,100,'normal'),
        //new Jellyfish(400,150,100,100,'toxic'),
    ],
    [
        new CollectableObject (350,200,30,30,'coin'),
        new CollectableObject (300,200,50,50,'poison'),
    ],
    3500,
    600
);