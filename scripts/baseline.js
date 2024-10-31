
class baseline extends Phaser.Scene{
  constructor(){
    super("start");
  }

  init(data){
    this.selectCharacter = data.selectedPlayer3;
    console.log()
  }

  create() {
    this.initBackground();
    this.initKeys();

    // initialize player
    this.player = new Player(this, config.width / 2 - 50, config.height / 2, this.selectCharacter); 

    this.attacker = new Attackers(this, 0, 0,);

    this.slime = new Slime(this, 400, 300);

    this.initScore();

    this.initObjects();
    this.initEnd();
  }

  // initialize Backgrounds
  initBackground(){
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

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
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  // initialize objects
  initObjects(){
    this.obstaclesGroup = this.add.group();
    this.tree = this.physics.add.sprite(200, 150, "tree");
    this.tree.setImmovable(true);
    this.tree.setOrigin(0.5, 0.5);
    this.tree.setSize(30, 30);
    this.tree.setOffset(9, 9);
    //this.rocks = this.physics.add.sprite(100, 150, "rocks");

    this.obstaclesGroup.add(this.tree);
  }
  
  // initialize the end assets
  initEnd(){
    this.end = this.physics.add.sprite(700, 400, "end");
    this.end.setImmovable(true);
    this.end.setSize(32, 32);
    this.end.setOffset(5, 2);
  }

  initScore() {
    this.score = 0;
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: "24px",
      fill: "#ffffff"
    });
  }

  updateScore(points) {
    this.score += points;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  update() {
    this.player.movePlayer(this.cursors, {keyA: this.keyA, keyS: this.keyS, keyW: this.keyW, keyD: this.keyD});
    this.player.attack(this.keySpace);
    this.collidePlayerObjects();
    this.reachingTheEnd();

    // Attacker behavior
    if (this.attacker.attacker.active) {
      this.attacker.moveTowards(this.player.player);
      if (this.physics.overlap(this.attacker.attacker, this.player.player)) {
          this.attacker.attack(this.player.player);
      }
    }

    this.slime.update();
  }

  // Collision between Player and Object
  collidePlayerObjects(){
    this.physics.collide(this.player.player, this.obstaclesGroup);
  }

  reachingTheEnd(){
    this.physics.add.overlap(this.player.player, this.end, this.handleOverlap, null, this);
  }

  handleOverlap(){
    // function win
  }
  
}