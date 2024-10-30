
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
    this.player1 = this.physics.add.sprite(config.width / 2 - 50, config.height / 2, "player");
    // sets the canvas to be a boundary
    this.player1.setCollideWorldBounds(true);
    this.player1.play("player_anim");
    this.player1.setInteractive();
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
    this.movePlayer(this.player1);
    this.handleAttack(this.player1);
    this.collidePlayerObjects();
  }

  // animation function
  initAnimation(){

    // UP DOWN LEFT RIGHT

    // left
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 24, end: 29 }), 
      frameRate: 10,
      repeat: -1
    });

    //right
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 24, end: 29 }), 
      frameRate: 3,
      repeat: -1
    });

    //up
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 31, end: 35 }),
      frameRate: 10,
      repeat: -1
    });

    //down
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
    }

    }

    // stopping player
    if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
      if (player.anims.currentAnim?.key !== 'stop') {
          player.anims.play('stop', true);
      }
    }
  }
  
  // attacking
  handleAttack(player){
    if(this.keySpace.isDown && !this.isAttacking){
      this.isAttacking = true
      if(player.anims.currentAnim?.key !== 'attack'){
        player.anims.play('attack',true);
      }
      player.on('animationcomplete-attack', () => {
        player.anims.play('stop');
      })
    }
  }

  // Collision between Player and Object
  collidePlayerObjects(){
    this.physics.collide(this.player1, this.obstaclesGroup);
  }
  
}

// menu
class MenuScene extends Phaser.Scene {
  constructor() {
      super("menuScene"); // Identifier for the menu scene
  }
  preload(){
    this.load.image("player", "assets/characters/character2_large.png")
    this.load.image("player2", "assets/characters/character2_full.png")
    this.load.image("startButton","assets/objects/start.png")
  }
  create() {
    //  Info
    this.add.text(this.cameras.main.centerX -290,230, "Controls:\nSpace - Attack\nW - Walk Forward\nA - Left\nD - Right\nS - Backward", {
      font: "24px Arial",
      fill: "#ffffff",
      align: "center"
      }).setOrigin(0.5);

      this.add.text(this.cameras.main.centerX,50, "Pick Your Hero!",{
        font:"32px",
        fill: "#ffffff"
      }).setOrigin(0.5);

      // Charc1
      this.player = this.add.sprite(this.cameras.main.centerX - 100,200,"player").setInteractive();
      this.player.setScale(1);

      // Char2
      this.player = this.add.sprite(this.cameras.main.centerX + 100,195,"player2").setInteractive();
      this.player.setScale(1.4);

      // border
      this.selectionOutline = this.add.graphics();
      this.selectionOutline.lineStyle(3, 0xffffff, 1); //3px white solid
      this.selectionOutline.lineStyle(0,0,0,0); //invisible

      // flag
      this.selected = null;

      // addEventListener
      this.player.on("pointerdown", ()=> this.selected("player"));
      this.player2.on("pointerdown", ()=> this.selected("player"))

      

      // Start the game
      // this.startButton = this.add.sprite(this.cameras.main.centerX, 450, "startButton").setInteractive();
      // this.startButton.on("pointerdown", ()=>{
      //   if (this.selected){
      //     this.scene.start("bootgame" , {player: this.selected})
      //   } else{
      //     this.add.text(this.cameras.main.centerX,500, "Please select a hero",{
      //       font: "18px",
      //       fill: "#ffffff"
      //     }).setOrigin(0.5)
      //   }
      // })
      // this.add.text(100, 150, "Press Enter to Play").setInteractive().on('pointerdown', () => {
      //     this.scene.start("bootGame"); // Transition to Scene1
      // });
  }


}




// SCENE1

class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background", "assets/tilesets/Grass_Middle.png");
    
    this.load.spritesheet("player", "assets/characters/player.png",{
      frameWidth: 48,
      frameHeight: 48
    });  

    this.load.image("tree", "assets/objects/Oak_Tree.png",{
      frameWidth: 48,
      frameHeight: 48
    });  
  }
  
  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");
  }
}

class Scene2 extends baseline {
  constructor() {
    super("playGame");
  }
}

var config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [MenuScene,Scene1,Scene2],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade:{
          debug: false
      }
    }
}
  
var game = new Phaser.Game(config);