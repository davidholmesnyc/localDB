## Local DB
		
### A wrapper to get,set,update or delete localstorage key/values 

## API & Example

Work in progress

### localdb.create 
```javascript
  localDB.create("employess",[])
``
### localdb.select
```javascript
  localdb.select("employees")
```

### localdb.add 
```javascript
  localdb.select("employees").add({
  name:"David Holmes"
  address:"123 main st.",
  state:"NY",
  city:"NY",
  ssn:"555-55-555",
})


```

### localDB.update( key, search_object || replace , replace )

```javascript
  localDB.update('employees', "David" ) // for strings
  localDB.update('employees', {address:"123 main st"}) // for single objects .. no need to do a lookup 
  localDB.update('employees', {id: 1} , {address:"123 main st"} ) // for collections
 
```
 
