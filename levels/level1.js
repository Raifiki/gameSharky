/**
 * This function generates the 1st level of the game
 * 
 * @returns {Level} - level object with all enemies, barriers, collectable objects, length and height
 */
function generateLvl1(){
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
            animated:[
    
            ]
        },
        [
            new Barrier(2000,450,400,150,0),
            new Barrier(1975,0,110,450,2),
            new Barrier(2150,0,400,150,0),
            new Barrier(2500,150,110,450,2),
    
            new Barrier(3200,75,150,525,2),
            new Barrier(3700,200,200,200,1),
            new Barrier(4200,0,150,500,2),
    
            new Barrier(4750,450,400,150,0),
            new Barrier(5500,75,150,525,2),
    
            new Barrier(5650,450,400,150,0),
            new Barrier(6800,0,150,265,2),
            new Barrier(6800,335,150,265,2),        
        ],
        [   // enemies
            new Pufferfish(800,500,0,'green'),
            new Pufferfish(1200,100,0,'green'),
            new Pufferfish(1300,200,0,'orange'),
            new Pufferfish(1800,300,0,'green'),
            new Pufferfish(1700,400,0,'orange'),
    
            new Pufferfish(2375,370,0,'orange'),
            new Pufferfish(2375,265,0,'green'),
            new Pufferfish(2375,160,0,'red'),
    
            new Jellyfish(3000,150,0,0,'normal'),
            new Pufferfish(3000,450,0,'red'),
    
            new Jellyfish(3475,400,0,0,'normal'),
            new Jellyfish(4025,100,0,0,'normal'),
            new Pufferfish(3475,290,0,'green'),
            new Pufferfish(4025,290,0,'orange'),
    
            new Jellyfish(4900,200,0,0,'toxic'),
            new Pufferfish(5000,480,0,'red'),
    
            new Jellyfish(5950,100,0,0.5,'normal'),
            new Jellyfish(6500,260,0,0.5,'toxic'),
            new Pufferfish(5650,480,0,'red'),
            new Pufferfish(6550,480,0,'red'),
        ],
        [   
            new CollectableObject (530,480,'coin'),
            new CollectableObject (580,430,'coin'),
            new CollectableObject (630,400,'coin'),
            new CollectableObject (680,430,'coin'),
            new CollectableObject (730,480,'coin'),
            new CollectableObject (1080,180,'coin'),
            new CollectableObject (1130,180,'coin'),
            new CollectableObject (1180,180,'coin'),
            new CollectableObject (1230,180,'coin'),
            new CollectableObject (1480,480,'coin'),
            new CollectableObject (1530,430,'coin'),
            new CollectableObject (1580,400,'coin'),
            new CollectableObject (1630,430,'coin'),
            new CollectableObject (1680,480,'coin'),
            
            new CollectableObject (2030,505,'coin'),
            new CollectableObject (2130,505,'coin'),
            new CollectableObject (2230,505,'coin'),
            new CollectableObject (2330,505,'coin'),
            
            new CollectableObject (2630,60,'coin'),
            new CollectableObject (2730,150,'coin'),
            new CollectableObject (2830,240,'coin'),
            new CollectableObject (2930,330,'coin'),
            new CollectableObject (3030,420,'coin'),
    
            new CollectableObject (3405,330,'coin'),
            new CollectableObject (3405,420,'coin'),
            new CollectableObject (3405,500,'coin'),
            new CollectableObject (3495,500,'coin'),
            new CollectableObject (3585,500,'coin'),
            new CollectableObject (3585,420,'coin'),
            new CollectableObject (3585,330,'coin'),
            new CollectableObject (3495,330,'coin'),
            new CollectableObject (3955,30,'coin'),
            new CollectableObject (3955,120,'coin'),
            new CollectableObject (3955,200,'coin'),
            new CollectableObject (4045,200,'coin'),
            new CollectableObject (4135,200,'coin'),
            new CollectableObject (4135,120,'coin'),
            new CollectableObject (4135,30,'coin'),
            new CollectableObject (4045,30,'coin'),
    
            // care start
            new CollectableObject (4605,160,'coin'),
            new CollectableObject (4555,185,'coin'),
            new CollectableObject (4555,245,'coin'),
            new CollectableObject (4605,270,'coin'),
    
            new CollectableObject (4805,160,'coin'),
            new CollectableObject (4770,215,'coin'),
            new CollectableObject (4755,270,'coin'),
            new CollectableObject (4840,215,'coin'),
            new CollectableObject (4855,270,'coin'),
            new CollectableObject (4805,245,'coin'),
    
            new CollectableObject (5005,160,'coin'),
            new CollectableObject (5005,215,'coin'),
            new CollectableObject (5005,270,'coin'),
            new CollectableObject (5060,170,'coin'),
            new CollectableObject (5050,215,'coin'),
            new CollectableObject (5075,270,'coin'),
    
            new CollectableObject (5205,185,'coin'),
            new CollectableObject (5205,245,'coin'),
            new CollectableObject (5255,150,'coin'),
            new CollectableObject (5265,215,'coin'),
            new CollectableObject (5255,280,'coin'),
            new CollectableObject (5305,150,'coin'),
            new CollectableObject (5305,280,'coin'),
            // care end
    
            new CollectableObject (6300,80,'coin'),
            new CollectableObject (6400,130,'coin'),
            new CollectableObject (6500,180,'coin'),
            new CollectableObject (6600,230,'coin'),
            new CollectableObject (6700,280,'coin'),
            new CollectableObject (6300,480,'coin'),
            new CollectableObject (6400,430,'coin'),
            new CollectableObject (6500,380,'coin'),
            new CollectableObject (6600,320,'coin'),
    
    
    
            new CollectableObject (620,490,'poison'),
            new CollectableObject (1570,490,'poison'),
            new CollectableObject (2070,170,'poison'),
            new CollectableObject (3040,370,'poison'),
            new CollectableObject (4790,470,'poison'),
            new CollectableObject (5050,470,'poison'),
            new CollectableObject (5720,470,'poison'),
            new CollectableObject (5870,470,'poison'),
    
            new CollectableObject (2445,150,'heart'),
            new CollectableObject (3370,490,'heart'),
            new CollectableObject (4220,490,'heart'),
            new CollectableObject (4920,490,'heart'),
            new CollectableObject (5645,490,'heart'),
            new CollectableObject (5795,490,'heart'),
            new CollectableObject (5945,490,'heart'),
        ],
        8000,
        600
    );
}