class GameWin extends Phaser.Scene{
    constructor(){
        super("gameWin")
    }

    create(data){
        this.cameras.main.setBackgroundColor("#000000");

        this.add.text(this.cameras.main.centerX, 100, "You Win!", {
            font: "40px Arial",
            fill: "#00FF00",
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.centerX, 200, `Your Score is: ${data.score}`, {
            font: "30px Arial",
            fill: "#ffffff",
        }).setOrigin(0.5);

        const nextButton = this.add.text(this.cameras.main.centerX, 300, "Next Level", {
            font: "28px Arial",
            fill: "#FFCC00",
        }).setOrigin(0.5).setInteractive();

        /*nextButton.on("pointerdown", () => {
            this.scene.start("nextLevel");
        });*/
    }
}