class Slime {
    constructor(scene, x, y) {
      this.scene = scene;
      this.slime = this.scene.physics.add.sprite(x, y, "slime");
      this.slime.setInteractive();
      
      this.moveSpeed = 30;
  
      this.overlap = this.scene.physics.add.overlap(this.scene.player.player, this.slime, this.slice, null, this);

    }

    update() {
      let player = this.scene.player.player;
      let dx = this.slime.x - player.x;
      let dy = this.slime.y - player.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance < 150) { 
        this.slime.setVelocityX((dx / distance) * this.moveSpeed);
        this.slime.setVelocityY((dy / distance) * this.moveSpeed);
      } else {
        this.slime.setVelocity(0, 0);
      }
    }
  
    slice() {

        this.scene.updateScore(10);
        
        if (this.sprite) {
            this.sprite.destroy();
            this.sprite = null;
        }

        this.scene.physics.world.removeCollider(this.overlap);

    }
  }
  