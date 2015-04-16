(function(){


var storage = {}
storage.helperFunctions = {}
  storage.get = function(key){
    var s = JSON.parse(localStorage.getItem(key));
    return s
  }

  storage.typeof = function (value) {
      var s = typeof value;
      if (s === 'object') {
          if (value) {
              if (value instanceof Array) {
                  s = 'array';
              }
          } else {
              s = 'null';
          }
      }
      return s;
  }
  storage.set = function(key,value){
    localStorage.setItem(key, JSON.stringify(value) );
    if(storage.get(key))
      return true
    else
      return false
  }
  storage.addTo = function(key,value){
    console.log('value',value)
    var val = storage.get(key)
    console.log( storage.typeof(val) )
    //storage.typeof(value)
    if(storage.typeof(val)  === 'array'){
      console.log('storage type: array')
      val.push(value)
      return storage.set(key,val)
    } 
    else if(storage.typeof(val)  === 'object'){
      console.log('storage type: object')
      var array = []
      array.push(val)
      array.push(value)
      return storage.set(key,array)
    }
    else if(storage.typeof(val)  === 'string'){
      console.log('storage type: string')
      var val = val + value
      return storage.set( key,val)
    }
    else if(!val || val === false || val === 'null' || val === null){
      console.log('storage type: not in keys')
      return storage.set(key,value)
    }else{
      console.log('we dont know what type of storage this is ')
      return false
    }
  }
  storage.find = function(key,object){
   var cache = storage.get(key)
    if(storage.typeof(key) === 'object' ){
      var inStorage =[]
      inStorage.push(cache)
    }else{
      var inStorage = storage.get(key)
    }
    
    var s = _.where( inStorage , object)
    return s
  }
  storage.update  = function(database,whereobject,replace){
    // storage.update('employee', {employeeID: id}, 10 )
    if(!whereobject){
    	localStorage.removeItem(key);
    	return true;
    }
    var array = storage.get(database)
    if(storage.typeof(array) === 'object' ){
      var arrayCache = array
      var array = []
      array.push(arrayCache)
    }
    b1 = whereobject
    b2 = ''
    var filteredArray = _.filter(array, function(object) {
    	console.log(object)
    	b2 = object
    	return object
        if( object[ Object.keys(whereobject)[0] ] != whereobject[ Object.keys(whereobject)[0] ])
          return object; 
    })
    //arr = _.without(array, _.findWhere(array,whereobject ));

    filteredArray.push(replace)
    //console.log('filteredArraydfdfd',filteredArray)

    return storage.set(database,filteredArray)
  }

  storage.delete = function(key,whereobject){
    if(!whereobject){
    	localStorage.removeItem(key);
    	return true;
    }
    var array = storage.get(key)
    if(storage.typeof(array) === 'object' ){
      var arrayCache = array
      var array = []
      array.push(arrayCache)
    }
    
    var filteredArray = _.filter(array, function(object) {
        if(object[ Object.keys(whereobject)[0] ] != whereobject[ Object.keys(whereobject)[0] ])
          return object; 
    })
  
    if(typeof whereobject === undefined){
      localStorage.removeItem(key)
    }else{
      storage.set(key,filteredArray)
    }
    
    if(!array)
      return true
    else
      return false

  }

    function create(object,callback){
      console.log(object)
      var s = storage.addTo(object.DATABSASE, object.formData )
      callback(s)
      
    }
    return window.localDB = storage
 })()