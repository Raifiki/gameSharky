function generateLvlDev() {
    return new Level( 
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
            //animated:[
    
            //]
        },
        [
            new Barrier(500,450,400,150,0),
            new Barrier(400,0,110,450,2),
            new Barrier(700,0,400,150,1),     
        ],
        [   // enemies
            new Pufferfish(500,500,0,'green'),
            new Pufferfish(600,400,0,'orange'),
            new Pufferfish(700,160,0,'red'),
    
            new Jellyfish(1000,100,0,0.5,'normal'),
            new Jellyfish(1100,260,0,0.5,'toxic'),
        ],
        [   
            new CollectableObject (530,480,'coin'),
            new CollectableObject (620,490,'poison'),
            new CollectableObject (300,150,'heart'),
        ],
        2500,
        600
    )
}