class Attackers{
    constructor(scene, x, y){
        this.scene = scene;
        this.attacker = this.scene.physics.add.sprite(x, y);
        this.attacker.setCollideWorldBounds(true);

        this.moveSpeed = 60;
        
        this.initAnimations();
        
        this.isAttacking = false;
    }

    initAnimations(){
        const anims = this.scene.anims;

        // Attack animations for different directions
        anims.create({
            key: 'attack-left',
            frames: anims.generateFrameNumbers("skeleton", { start: 43, end: 48 }), // Adjust frame indices
            frameRate: 10,
            repeat: -1,
        });

        anims.create({
            key: 'attack-right',
            frames: anims.generateFrameNumbers("skeleton", { start: 43, end: 48 }), // Adjust frame indices
            frameRate: 10,
            repeat: -1,
        });

        anims.create({
            key: 'attack-up',
            frames: anims.generateFrameNumbers("skeleton", { start: 37, end: 42 }), // Adjust frame indices
            frameRate: 10,
            repeat: -1,
        });

        anims.create({
            key: 'attack-down',
            frames: anims.generateFrameNumbers("skeleton", { start: 49, end: 54 }), 
        });

         // Running animations for different directions
        anims.create({
            key: 'run-left',
            frames: anims.generateFrameNumbers("skeleton", { start: 24, end: 29 }),
            frameRate: 10,
            repeat: -1,
        });

        anims.create({
            key: 'run-right',
            frames: anims.generateFrameNumbers("skeleton", { start: 24, end: 29 }),
            frameRate: 10,
            repeat: -1,
        });

        anims.create({
            key: 'run-up',
            frames: anims.generateFrameNumbers("skeleton", { start: 30, end: 35 }),
            frameRate: 10,
            repeat: -1,
        });

        anims.create({
            key: 'run-down',
            frames: anims.generateFrameNumbers("skeleton", { start: 18, end: 23 }),
            frameRate: 10,
            repeat: -1,
        });
    }

    moveTowards(target) {
        const distance = Phaser.Math.Distance.Between(this.attacker.x, this.attacker.y, target.x, target.y);

        if (distance > 50) { 
            this.scene.physics.moveTo(this.attacker, target.x, target.y, 100); // Move towards player
    
            const angle = Phaser.Math.Angle.Between(this.attacker.x, this.attacker.y, target.x, target.y);
            const direction = this.getRunDirection(angle);
    
            this.attacker.anims.play(direction, true);
        } else {
            this.attacker.anims.stop();
        }
    }
    getRunDirection(angle) {
        if (angle >= -Math.PI / 4 && angle < Math.PI / 4) {
            return 'run-right'; // Run right
        } else if (angle >= Math.PI / 4 && angle < 3 * Math.PI / 4) {
            return 'run-up'; // Run up
        } else if (angle >= 3 * Math.PI / 4 || angle < -3 * Math.PI / 4) {
            return 'run-left'; // Run left
        } else {
            return 'run-down'; // Run down
        }
    }
    
}