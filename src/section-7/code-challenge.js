class Town {
  constructor(streets, parks) {
    this.streets = streets;
    this.parks = parks;
  }

  getAvgParkAge() {
    const thisYear = new Date().getFullYear();
    let sumAge = 0;
    for (let park of this.parks) {
      sumAge += (thisYear - park.getBuildYear());
    }
    return sumAge / this.streets.length;
  }

  getTotalStreetsLength() {
    let totalLength = 0;
    for (let street of this.streets) {
      totalLength += street.getLength();
    }
    return totalLength;
  }

  getAverageStreetsLength() {
    return this.getTotalStreetsLength() / this.streets.length;
  }

  generateReport() {
    console.log(`\n----PARKS REPORT----`);
    console.log(`Our ${this.parks.length} parks have an average age of ${this.getAvgParkAge()} years.`);
    for (let park of this.parks) {
      console.log(`${park.getName()} has a tree density of ${park.getTreeDensity()} trees per square mile.`);
    }
    const hdParks = this.parks.filter(park => park.getNumTrees() > 1000);
    if (hdParks && hdParks.length > 0) {
      console.log(`The following parks have high tree density.`);
      hdParks.forEach(hdPark => console.log(`\t${hdPark.getName()}: ${hdPark.getNumTrees()} trees.`));
    } else {
      console.log(`There are no parks in the town with high tree density (greater than 1000 trees).`);
    }

    console.log(`\n----STREETS REPORT----`);
    console.log(`Our ${this.streets.length} streets have a total length of ${this.getTotalStreetsLength()} miles, with an average length of ${this.getAverageStreetsLength()} miles`);
    for (let street of this.streets) {
      console.log(`${street.getName()}, built in ${street.getBuildYear()}, is a ${(street.getSize() === undefined ? 'normal' : street.getSize())} street`);
    }
  }
}

class TownElement {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }

  getName() {
    return this.name;
  }

  getBuildYear() {
    return this.buildYear;
  }
}

class Park extends TownElement {
  constructor(name, buildYear, numTrees, area) {
    super(name, buildYear);
    this.numTrees = numTrees;
    this.area = area;
  }

  getNumTrees() {
    return this.numTrees;
  }

  getArea() {
    return this.area;
  }

  getTreeDensity() {
    return this.numTrees/this.area;
  }
}

class Street extends TownElement {
  constructor(name, buildYear, length, size) {
    super(name, buildYear);
    this.stLength = length;
    this.stSize = size;
  }

  getLength() {
    return this.stLength;
  }

  getSize() {
    return this.stSize;
  }
}

const streets = [];
streets.push(new Street('First Street', 1980, 20, 'tiny'));
streets.push(new Street('Second Street', 1981, 30, 'small'));
streets.push(new Street('Third Street', 1982, 40, 'normal'));
streets.push(new Street('Fourth Street', 1983, 50, 'big'));
streets.push(new Street('Fifth Street', 1984, 60, 'huge'));
streets.push(new Street('Sixth Street', 1985, 70));

const parks = [];
parks.push(new Park('Anna Park', 1976, 258, 4));
parks.push(new Park('Gramont Park', 1936, 578, 8));
parks.push(new Park('Circle Park', 1926, 655, 6));
parks.push(new Park('Salem Park', 2018, 4830, 7));
parks.push(new Park('Ingraham Park', 2012, 4026, 10));

const ourTown = new Town(streets, parks);
ourTown.generateReport();
