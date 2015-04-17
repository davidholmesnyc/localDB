(function(){

	this.typeof = function(string,callback) {
		var type = ({}).toString.call(this).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
		if(callback && string === type){
	  	return callback( type )
		}
	  return type
	}

	Function.prototype.typeof = this.typeof
	String.prototype.typeof = this.typeof
	Object.prototype.typeof = this.typeof
	Array.prototype.typeof = this.typeof


	window.localdb = {

	set:function(database,json){
		localStorage.setItem(database, JSON.stringify(json) );
	  return this
	},
	create:function(database,json){
		return this.set(database,json)
	},
	deleteDB:function(database){
	  localStorage.removeItem(database);
	  return this
	},
	select:function(database){
	  this.database = this.get(database)
	  this.database_name = database
	  if(!this.database){
	  	return alert(database+" not found")
	  }
	  return this
	},
	callback:function(callback){
		return callback(this);
	},
	add:function(json){
		if(this.database){
			var self = this
			this.database.typeof("string",function(){
				var val = json +" "+ this.database
				self.set( self.database_name ,val)
			})
			this.database.typeof("object",function(){
				var extend =  _.extend(this.database,json)
				self.set(self.database_name,extend)
			})
			this.database.typeof("array",function(){
				self.database.push(json)
				self.set(self.database_name, self.database)
			})
		}
		else{
			localStorage.setItem(this.database_name, JSON.stringify(json) );
		}
	  return this
	},
	find:function(object){
		
	},
	update:function(database,selector,replacer){
		var self = self 
	 	database.typeof("string",function(){
	  	var data = selector
	  	self.set(data)
	  })
	 	database.typeof("object",function(){
	    var data = _.extend(database,selector)
	    self.set(database,data)
	  })
		database.typeof("array",function(){
	  	var object_key = Object.keys(selector)[0];
	  	var map = _.map(array,function(object){
	  	 if( object[ object_key ] ===  selector[ object_key] ){
	  	   _.extend(object,replace)
	  	 }
	  	  return object
	  	})
			self.set(database,map)
		})
	  return this
	},
	get:function(database){
		if(!database)
			var database = this.database_name;

		var s = JSON.parse(localStorage.getItem(database));
		return s
	}

	}
 //return window.localdb = localdb

 })()