## Local DB
		
### A wrapper to get,set,update or delete localstorage key/values 

## API & Example

Coming soon

### localDB.update( key, search_object || replace , replace )

update works a little different depending on what data you have in the value

For strings and single objects you only need two arguments - a key and what to update it with. 

For collections you need to have an ID that we can look up in the second argument and the third argument will be the one we use to update that object.

```javascript
  localDB.update('employee', "David" ) // for strings
  localDB.update('employee', {body:"mybody"}) // for single objects .. no need to do a lookup 
  localDB.update('employee', {id: 1} , {body:"my updated body"} ) // for collections
 
```
 
