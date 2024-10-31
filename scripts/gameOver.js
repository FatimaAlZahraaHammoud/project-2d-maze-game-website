class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    create() {
        this.cameras.main.setBackgroundColor("#000000");

        this.add.text(this.cameras.main.centerX, 100, "Game Over", {
            font: "40px Arial",
            fill: "#FF0000",
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.centerX, 200, "Press R to Restart", {
            font: "24px Arial",
            fill: "#FFFFFF",
        }).setOrigin(0.5);

        // Add restart key
        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
            this.scene.start("menuScene");
        }
    }
}