class Scene2 extends Phaser.Scene  {
    constructor() {
      super("playGame");
    }

    init(data){
      this.selectedCharacter = data.selectedPlayer2;
    }

    create(){
      this.scene.start("start", {selectedPlayer3: this.selectedCharacter});
    }
}
