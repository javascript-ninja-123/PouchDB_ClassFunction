const PouchDB = require('PouchDB');
const uniqid = require('uniqid');


const tryCatch = (fn) =>  (obj) => {
  try{
    return   fn(obj)
  }
  catch(e){
    throw new Error(e);
  }
}

const required = () => {
  throw new Error('arg is required')
}


class TrapDatabase{
  constructor(dbName){
    this._db = new PouchDB(dbName);
  }
  async save(obj = required()){
    const add = async (obj) => await this._db.put({...obj,_id:uniqid()})
    return tryCatch(add)(obj);
  }
  async saveAll(bulkArray = required()){
    const result = bulkArray.map((obj) => {
      return this.save(obj);
    });
    return Promise.all([...result])
  }
  async get(id = required()){
    const getData = async (id) => await this._db.get(id)
    return tryCatch(getData)(id)
  }
  async update(_id = required(), newObj = required()){
    const data = await this.get(_id);
    const add = async(newObj) => await this._db.put({_id,_rev:data._rev, ...newObj});
    return tryCatch(add)(newObj);
  }
  async remove(_id = required()){
    const data = await this.get(_id);
    const remove = async(_id) => await this._db.remove(_id,data._rev);
    return tryCatch(remove)(_id);
  }
  async fetchAll(obj){
    return await this._db.allDocs({
      include_docs: true,
      attachments: true,
      ...obj
    });
  }
};


const trap = new TrapDatabase('newDB');


trap.fetchAll()
.then(data => console.log(JSON.stringify(data,undefined,2)))
// trap.saveAll([{name:'yoyo'},{name:'ww'}])
// .then(response => console.log(response))

//
// trap.get('2qcyn53yjdq8cagx',{name:'aaa'})
// .then(data => console.log(data))

// trap.remove('2qcyn4xojdq6velc')
// .then(data => console.log(data))
