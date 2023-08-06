class Seed extends Denizen {

  constructor(options) {
    super(options);
    this.waterFriction = 0.3;      // "0.3" means "lose 30% per second"
    this.imageUri = '/images/seed.png';
    this.type = options.type;
    this.height = options.height || 30;
    this.width = options.width || 30;
    this.ttl = options.ttl || randRangeInt(3, 6);
  }

  updateOneTick() {
    this.velocity = this.velocity.scale( 1 - this.waterFriction * PHYSICS_TICK_SIZE_S );
    this.velocity.y -= 50 * PHYSICS_TICK_SIZE_S;

    var delta = this.velocity.scale(PHYSICS_TICK_SIZE_S);
    this.position = this.position.add(delta);

    this.ttl -= PHYSICS_TICK_SIZE_S;
    if (this.ttl < 0) {
      this.spawn();
      this.kill();
    }
  }

  updateOneTickAfterOut() {
    this.velocity = this.velocity.scale( 1 - this.waterFriction * PHYSICS_TICK_SIZE_S );
    this.velocity.y += 50 * PHYSICS_TICK_SIZE_S;

    var delta = this.velocity.scale(PHYSICS_TICK_SIZE_S);
    this.position = this.position.add(delta);
  }

  spawn() {
    var Type = this.type;
    var individual = new Type({
      tank: this.tank,
      position: this.position,
    });
  }

  onClick(event) {
    this.spawn();
    this.kill();
  }

  outOfTopBounds(bounds) {
    return (
      this.position.y - 5 * this.height > bounds.maxY
    );
  }

  update(t) {
    // if you're out of bounds, despawn
    if (this.outOfBounds(this.tank.getBounds())) {
      if (this.outOfTopBounds(this.tank.getBounds())) {
        this.updateOneTickAfterOut();
      } else {
        this.kill();
      }
    } else {
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
      }
    }
  }

}
