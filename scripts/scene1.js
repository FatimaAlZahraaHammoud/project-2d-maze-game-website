
// SCENE1

class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    init(data){
        this.selectedCharacter = data.selectedPlayer;
        console.log(this.selectedCharacter);
    }

    preload(){
        this.load.image("background-image", "assets/tilesets/Grass_Middle.png");

        this.load.spritesheet(this.selectedCharacter, `assets/characters/${this.selectedCharacter}.png`,{
            frameWidth: 48,
            frameHeight: 48
        });

        this.load.image("end", "assets/objects/end.png");  

        this.load.spritesheet("tree", "assets/objects/Oak_Tree.png", {
            frameWidth: 48,
            frameHeight: 48
        });

        this.load.spritesheet("skeleton", "assets/characters/skeleton.png", {
            frameWidth: 48,
            frameHeight: 48
        });

        this.load.spritesheet("slime", "assets/characters/slime.png", {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame", {selectedPlayer2: this.selectedCharacter});
    }
}
