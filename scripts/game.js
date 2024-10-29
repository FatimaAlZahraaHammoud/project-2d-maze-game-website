
class baseline extends Phaser.Scene{

  create() {

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.player1 = this.physics.add.sprite(config.width / 2 - 50, config.height / 2, "player");

    this.initAnimation();
    
    // sets the canvas to be a boundary
    this.player1.setCollideWorldBounds(true);

    // init keys
    this.cursors = this.input.keyboard.createCursorKeys();
    

    this.player1.play("player_anim");
    this.player1.setInteractive();
  }

  update() {
    this.movePlayer(this.player1);
  }

  // animation function
  initAnimation(){
    
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 29, end: 24 }), 
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

    this.anims.create({
      key: 'stop',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }), 
      frameRate: 10,
      repeat: -1
    });
  }

  movePlayer(player) {

    player.setVelocity(0);

    if (this.cursors.left.isDown) {
      player.setVelocityX(-130);
      if (player.anims.currentAnim?.key !== 'down') {
        player.anims.play('left', true);
      }
     
    }
    
    else if (this.cursors.right.isDown) {
      player.setVelocityX(130);
      if (player.anims.currentAnim?.key !== 'right') {
        player.anims.play('right', true);
    } 
    }

    if (this.cursors.up.isDown) {
      player.setVelocityY(-130);
      if (player.anims.currentAnim?.key !== 'up') {
        player.anims.play('up', true);
    }

    }
  
    else if (this.cursors.down.isDown) {
      player.setVelocityY(130);
      if (player.anims.currentAnim?.key !== 'down') {
        player.anims.play('down', true);
    }

    }

    else{
      player.setVelocityY(0);
      if (player.anims.currentAnim?.key !== 'stop') {
        player.anims.play('stop', true);
      }
    }
  }
}

// menu
class MenuScene extends Phaser.Scene {
  constructor() {
      super("menuScene"); // Identifier for the menu scene
  }
  
  create() {
      this.add.text(100, 100, "Menu Scene");
      this.add.text(100, 150, "Press Enter to Play").setInteractive().on('pointerdown', () => {
          this.scene.start("bootGame"); // Transition to Scene1
      });
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
