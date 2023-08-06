class BiteFish extends Fish{

  constructor(options) {
    super(options);
    this.isTasty = false;
    this.imageUri = '/images/bite-fish.gif';
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S);
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }


  }
  update(t) {
    // if you're out of bounds, despawn
    if (this.outOfBounds(this.tank.getBounds())) {
      this.makeNewVelocity(50);
    } else {
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
        let nearbyDenizens = this.tank.getProximateDenizens(this.position, 30, this);
        for (const denizen of nearbyDenizens) {
          if (denizen.isTasty === true) {
            denizen.kill();
          }
        }
      }
    }
  }

}
