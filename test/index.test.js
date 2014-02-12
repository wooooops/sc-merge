var should = require( "should" ),
  merge = require( "../index" );

describe( "merge", function () {

  var object1 = {
    married: false,
    name: "David",
    country: "Japan"
  };

  var object2 = {
    male: true,
    country: "Australia",
    address: {
      street: "1 smith st",
      type: {
        lowset: true,
        brick: false
      },
      suburb: "smithville"
    }
  };

  var object3 = {
    married: true,
    address: {
      street: "1 smith street",
      type: {
        brick: true,
        tiles: {
          color: "orange",
          condition: "good"
        }
      },
      country: "Australia"
    }
  };

  it( "should merge an object", function () {

    var mergedObject = merge( {}, object1, object2, {}, object3 );

    mergedObject.should.have.a.property( "name", object1.name );
    mergedObject.should.have.a.property( "married", object3.married );
    mergedObject.should.have.a.property( "country", object2.country );
    mergedObject.should.have.a.property( "male", object3.male );
    mergedObject.should.have.a.property( "address" );
    mergedObject.address.should.have.a.property( "street", object3.street );
    mergedObject.address.should.have.a.property( "country", object3.country );
    mergedObject.address.should.not.have.a.property( "suburb" );

  } );

  it( "should merge a object deeply", function () {

    var mergedObject = merge( true, {}, object1, {}, object2, object3 );

    mergedObject.should.have.a.property( "name", object1.name );
    mergedObject.should.have.a.property( "married", object3.married );
    mergedObject.should.have.a.property( "country", object2.country );
    mergedObject.should.have.a.property( "male", object3.male );
    mergedObject.should.have.a.property( "address" );
    mergedObject.address.should.have.a.property( "street", object3.street );
    mergedObject.address.should.have.a.property( "suburb", object2.suburb );
    mergedObject.address.should.have.a.property( "country", object3.country );
    mergedObject.address.should.have.a.property( "type" );
    mergedObject.address.type.should.have.a.property( "lowset", object2.address.type.lowset );
    mergedObject.address.type.should.have.a.property( "brick", object3.address.type.brick );
    mergedObject.address.type.should.have.a.property( "tiles" );
    mergedObject.address.type.tiles.should.have.a.property( "color", object3.address.type.tiles.color );
    mergedObject.address.type.tiles.should.have.a.property( "condition", object3.address.type.tiles.condition );

  } );

  it( "should merge non-objects", function () {

    var mergedObject = merge( {
      visible: false,
      active: false
    }, void 0, {
      visible: true
    }, /^/, Object );

    mergedObject.should.be.an.instanceOf( Object );
    mergedObject.should.have.a.property( "visible", true );
    mergedObject.should.have.a.property( "active", false );

    merge( {}, void 0 ).should.be.an.instanceOf( Object );
    Object.keys( merge( {}, void 0 ) ).should.have.a.lengthOf( 0 );
    Object.keys( merge( {
      a: "a"
    }, void 0 ) ).should.have.a.lengthOf( 1 );

  } );

} );