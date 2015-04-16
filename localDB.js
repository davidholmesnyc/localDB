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
  	// storage.update('employee', {id: id}, {body:"true"} ) // for arrays of objects
    // storage.update('employee', {body:true}) // for single objects .. no need to do a lockup 
    // storage.update('employee', "David" ) // for strings
		var array = storage.get(database)
    
    if(storage.typeof(array) === 'string' ){
			var array = whereobject
    	return storage.set(database,array)
    }
    
    var object_key = Object.keys(whereobject)[0];
    var search_object = Object.keys(whereobject);
    
		
		if(storage.typeof(array) === 'object' ){
			var array = _.extend(array,whereobject)
      return storage.set(database,array)
    }

    if(storage.typeof(array) === 'array' ){
    	var replace_key = Object.keys(replace)[0];
    	var map = _.map(array,function(object){
	    	if( object[ object_key ] ===  whereobject[ object_key] ){
	    		_.extend(object,replace)
	    	}
	    	return object
	    })
    	return storage.set(database,map)
		}
   
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