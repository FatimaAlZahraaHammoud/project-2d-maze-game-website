
class baseline extends Phaser.Scene{
  constructor(sceneKey){
    super(sceneKey)
  }

  create() {
    this.initBackground();
    this.initPlayer();
    this.initAnimation();
    this.initKeys();
    this.initObjects();
    }

  // initialize Backgrounds
  initBackground(){
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

  }

  // initialize Player
  initPlayer(){

    this.player= this.physics.add.sprite(config.width / 2 - 50, config.height / 2, "player");
    // sets the canvas to be a boundary
    this.player.setCollideWorldBounds(true);

    // checking if there is animation
    if(this.anims.exists("player_anim")){
        this.player.play("player_anim");
    } else{
      console.warn("Animation 'player_anim' not found")
    }
  
    this.player.setInteractive();
  }

  // initialize objects
  initObjects(){
    this.obstaclesGroup = this.add.group();
    this.tree = this.physics.add.sprite(200, 150, "tree");
    this.tree.setImmovable(true);
    this.tree.setSize(20, 20);
    this.tree.setOffset(3, 3);
    //this.rocks = this.physics.add.sprite(100, 150, "rocks");

    this.obstaclesGroup.add(this.tree);
  }
  
  // initialize Keys
  initKeys(){
    // init keys
    this.cursors = this.input.keyboard.createCursorKeys();
    // W A S D
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    // space bar
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

  }
  // animation function
  initAnimation(){
    // UP DOWN LEFT RIGHT
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 24, end: 29 }), 
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 24, end: 29 }), 
    frameRate: 3,
    repeat: -1
  });

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('player', { start: 31, end: 35 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('player', { start: 19, end: 23 }), 
    frameRate: 5,
    repeat: -1
  });
  // Ending directions

  this.anims.create({
    key: 'stop',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }), 
    frameRate: 10,
    repeat: -1
  });

  // Attack animation
  this.anims.create({
    key: 'attack',
    frames: this.anims.generateFrameNumbers('player', {start:36,end:39}),
    frameRate:10,
    repeat:2,
  })
}

  update() {
    this.movePlayer(this.player);
    this.handleAttack(this.player);
    this.collidePlayerObjects();
  }

  movePlayer(player) {

    player.setVelocity(0);

    // moving player left
    if (this.cursors.left.isDown||this.keyA.isDown) {
      player.setVelocityX(-130);
      player.flipX = true;
      if (player.anims.currentAnim?.key !== 'left') {
        player.anims.play('left', true);
      }
     
    }
    
    // moving player right
    else if (this.cursors.right.isDown||this.keyD.isDown) {
      player.setVelocityX(130);
      player.flipX = false;
      if (player.anims.currentAnim?.key !== 'right') {
        player.anims.play('right', true);
      } 
    }

    // moving player up
    if (this.cursors.up.isDown||this.keyW.isDown) {
      player.setVelocityY(-130);
      if (player.anims.currentAnim?.key !== 'up') {
        player.anims.play('up', true);
      }
    }
    
    // moving player down
    else if (this.cursors.down.isDown||this.keyS.isDown) {
      player.setVelocityY(130);
      if (player.anims.currentAnim?.key !== 'down') {
        player.anims.play('down', true);
    }}

    // stopping player
    if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
      if (player.anims.currentAnim?.key !== 'stop') {
          player.anims.play('stop', true);
      }
    }
  }
  
  // attacking
  // handleAttack(player){
  //   if(this.keySpace.isDown && !this.isAttacking){
  //     this.isAttacking = true
  //     if(player.anims.currentAnim?.key !== 'attack'){
  //       player.anims.play('attack',true);
  //     }
  //     player.on('animationcomplete-attack', () => {
  //       player.anims.play('stop');
  //     })
  //   }
  // }

  // Collision between Player and Object
  collidePlayerObjects(){
    this.physics.collide(this.player, this.obstaclesGroup);
  }
  
}

// menu
// class MenuScene extends Phaser.Scene {
//   constructor() {
//       super("menuScene"); // Identifier for the menu scene
//   }
//   preload(){
//     this.load.image("player", "assets/pictures/player_large.png")
//     this.load.image("player2", "assets/pictures/player2_large.png")
//     this.load.image("startButton","assets/pictures/start.png")
//     this.load.image("background", "assets/pictures/background.png")
//   }
//   create() {
//     // background
//     this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "background").setOrigin(0.5);


//     //  Info
//     this.add.text(this.cameras.main.centerX -290,430, "Controls:\nSpace - Attack\nW - Walk Forward\nA - Left\nD - Right\nS - Backward", {
//       font: "24px Arial",
//       fill: "#ffffff",
//       align: "center"
//       }).setOrigin(0.5);
//       // title
//       this.add.text(this.cameras.main.centerX,50, "Pick Your Hero!",{
//         font:"32px",
//         fill: "#ffffff"
//       }).setOrigin(0.5);
//       this.start =this.add.sprite(this.cameras.main.centerX)

//       // Charc1
//       this.player = this.add.sprite(this.cameras.main.centerX - 100,200,"player").setInteractive();
//       this.player.setScale(1);

//       // Char2
//       this.player2 = this.add.sprite(this.cameras.main.centerX + 100,195,"player2").setInteractive();
//       this.player2.setScale(1.4);

//       // border
//       this.selectionOutline = this.add.graphics();
//       this.selectionOutline.lineStyle(0, 0xffffff, 1); //3px white solid
  
//       // flag
//       this.selected = null;

//       // addEventListener
//       this.player.on("pointerdown", ()=> this.selectCharacter(this.player));
//       this.player2.on("pointerdown", ()=> this.selectCharacter(this.player2))

//       // starting the game
//       this.startButton = this.add.sprite(this.cameras.main.centerX, 450, "startButton").setInteractive();
//       this.startButton.setScale(0.1)

//         this.startButton.on("pointerdown", () => {
//             if (this.selected) {
//                 // Start game
//                 this.scene.start("bootgame")//, { player: this.selected });
//             } else {
//                 this.add.text(this.cameras.main.centerX, 500, "Please select a hero", {
//                     font: "18px",
//                     fill: "#ffffff"
//                 }).setOrigin(0.5);
//               }
//         })
//     }
    
//     selectCharacter(character){
//       this.selected = character.texture.key; 
//       // Clear 
//       this.selectionOutline.clear();

//       // Draw new outline around the selected character
//       this.selectionOutline.lineStyle(3, 0xffffff); // 3px white solid line
//       this.selectionOutline.strokeRect(
//           character.x - character.displayWidth / 2 - 5, 
//           character.y - character.displayHeight / 2 - 5, 
//           character.displayWidth + 10, 
//           character.displayHeight + 10 
//       );
// }
// }




// SCENE1

class Scene1 extends baseline {
  constructor() {
    super("bootgame");
  }

  // init(data){
  //   this.selectCharacter = data.player
  // }

  preload(){
    this.load.image("background", "assets/tilesets/Grass_Middle.png");
  
    // this.load.spritesheet(this.selectCharacter, `assets/characters/${this.selectCharacter}`,{
    //   frameWidth: 48,
    //   frameHeight: 48
    // });  

    this.load.image("player10", "assets/characters/player.png",{
      frameHeight:48,
      frameWidth:48
    })

    // this.load.image("tree", "assets/objects/Oak_Tree.png",{
    //   frameWidth: 48,
    //   frameHeight: 48
    // });  
  }
  
  create() {
    super.create()
    this.initAnimation(); // Ensure animations are initialized
        this.player = this.physics.add.sprite(config.width / 2, config.height / 2, "player10");
        this.player.setCollideWorldBounds(true);
    // this.add.text(20, 20, "Loading game...");
    // this.scene.start("playGame");
  }

  update(){
    super.update()
    this.movePlayer(this.player); 
  }
}

// class Scene2 extends baseline {
//   constructor() {
//     super("playGame");
//   }
// }

var config = {
    width: 800,
    height: 600,
    // backgroundColor: 0xffffff,
    scene: [Scene1],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade:{
          debug: false
      }
    }
}
  
var game = new Phaser.Game(config);