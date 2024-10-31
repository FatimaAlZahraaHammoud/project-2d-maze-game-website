class Player{
    constructor(scene, x, y, selectedPlayer){
        this.scene = scene;
        this.player = this.scene.physics.add.sprite(x, y, selectedPlayer);

        // some player properties:
        this.player.setCollideWorldBounds(true);

        if(this.scene.anims.get("player_anim")){
            this.player.play("player_anim");
        } 
        else{
          console.warn("Animation 'player_anim' not found")
        }
        this.player.setInteractive();

        this.isAttacking = false;

        this.initAnimations(selectedPlayer);

    }

    initAnimations(selectedPlayer){

        const anims = this.scene.anims;

        // UP DOWN LEFT RIGHT

        // left
        anims.create({
            key: 'left',
            frames: anims.generateFrameNumbers(selectedPlayer, { start: 24, end: 29 }), 
            frameRate: 10,
            repeat: -1
        });
    
        //right
        anims.create({
            key: 'right',
            frames: anims.generateFrameNumbers(selectedPlayer, { start: 24, end: 29 }), 
            frameRate: 10,
            repeat: -1
        });
    
        //up
        anims.create({
            key: 'up',
            frames: anims.generateFrameNumbers(selectedPlayer, { start: 30, end: 35 }),
            frameRate: 10,
            repeat: -1
        });
    
        //down
        anims.create({
            key: 'down',
            frames: anims.generateFrameNumbers(selectedPlayer, { start: 18, end: 23 }), 
            frameRate: 10,
            repeat: -1
        });
    
        // Ending directions
        anims.create({
            key: 'stop',
            frames: anims.generateFrameNumbers(selectedPlayer, { start: 0, end: 5 }), 
            frameRate: 10,
            repeat: -1
        });
    
        // Attack animation
        anims.create({
            key: 'attack',
            frames: anims.generateFrameNumbers(selectedPlayer, {start:36,end:39}),
            frameRate:10,
            repeat:2,
        });
    }

    movePlayer(cursors, keys){
        
        this.player.setVelocity(0);

        // moving player left
        if (cursors.left.isDown||keys.keyA.isDown) {
            this.player.setVelocityX(-130);
            this.player.flipX = true;
            if (this.player.anims.currentAnim?.key !== 'left') {
                this.player.anims.play('left', true);
            }
        }
        
        // moving player right
        else if (cursors.right.isDown||keys.keyD.isDown) {
            this.player.setVelocityX(130);
            this.player.flipX = false;
            if (this.player.anims.currentAnim?.key !== 'right') {
                this.player.anims.play('right', true);
            } 
        }

        // moving player up
        if (cursors.up.isDown||keys.keyW.isDown) {
            this.player.setVelocityY(-130);
            if (this.player.anims.currentAnim?.key !== 'up') {
                this.player.anims.play('up', true);
            }
        }
        
        // moving player down
        else if (cursors.down.isDown||keys.keyS.isDown) {
            this.player.setVelocityY(130);
            if (this.player.anims.currentAnim?.key !== 'down') {
                this.player.anims.play('down', true);
            }
        }

        // stopping player
        if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
            if (this.player.anims.currentAnim?.key !== 'stop') {
                this.player.anims.play('stop', true);
            }
        }
    }

    attack(keySpace){
        if(keySpace.isDown && !this.isAttacking){
          this.isAttacking = true;
          if(this.player.anims.currentAnim?.key !== 'attack'){
            this.player.anims.play('attack',true);
          }
          this.player.on('animationComplete-attack', () => {
            this.player.anims.play('stop');
            this.isAttacking = false;
          })
        }
    }
}