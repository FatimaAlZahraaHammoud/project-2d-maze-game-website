//menu

class MenuScene extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
      this.load.image("player1", "assets/pictures/player_large.png");
      this.load.image("player2", "assets/pictures/player2_large.png");
      this.load.image("startButton","assets/pictures/start.png");
      this.load.image("background", "assets/pictures/background.png");
    }
    create() {
        // background
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "background").setOrigin(0.5);
        
        // info
        this.add.text(this.cameras.main.centerX -290,430, "Controls:\nSpace - Attack\nW - Walk Forward\nA - Left\nD - Right\nS - Backward", {
            font: "24px Arial",
            fill: "#ffffff",
            align: "center"
        }).setOrigin(0.5);
        // title
        this.add.text(this.cameras.main.centerX,50, "Pick Your Hero!",{
            font:"32px",
            fill: "#ffffff"
        }).setOrigin(0.5);
      
        this.start = this.add.sprite(this.cameras.main.centerX);
        
        // Character 1
        this.player1 = this.add.sprite(this.cameras.main.centerX - 100,200,"player1").setInteractive();
        this.player1.setScale(1);
    
        // Character 2
        this.player2 = this.add.sprite(this.cameras.main.centerX + 100,195,"player2").setInteractive();
        this.player2.setScale(1.4);

        // border
        this.selectionOutline = this.add.graphics();
        this.selectionOutline.lineStyle(0, 0xffffff, 1);
    
        // flag
        this.selected = null;
    
        // addEventListener
        this.player1.on("pointerdown", ()=> this.selectCharacter(this.player1));
        this.player2.on("pointerdown", ()=> this.selectCharacter(this.player2));
        
        // starting the game
        this.startButton = this.add.sprite(this.cameras.main.centerX, 450, "startButton").setInteractive();
        this.startButton.setScale(0.1);
    
        // Start game
        this.startButton.on("pointerdown", () => {
            if (this.selected) {
                this.scene.start("bootGame", {selectedPlayer: this.selected});
            } else {
                this.add.text(this.cameras.main.centerX, 500, "Please select a hero", {
                    font: "18px",
                    fill: "#ffffff"
                }).setOrigin(0.5);
            }
        });
    }
    
    selectCharacter(character){
        this.selected = character.texture.key === "player2" ? "player" : "player2";

        console.log(this.selected)
        // Clear
        this.selectionOutline.clear();
    
        // Draw new outline around the selected character
        this.selectionOutline.lineStyle(3, 0xffffff);
        this.selectionOutline.strokeRect(
            character.x - character.displayWidth / 2 - 5, 
            character.y - character.displayHeight / 2 - 5, 
            character.displayWidth + 10, 
            character.displayHeight + 10 
        );
    }
}
  