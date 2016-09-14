angular.module('starter.services', [])

.value('PARSE_CREDENTIALS',{
	APP_ID: 'xhTpJiNedJ7mmDj3LTTBUePqSVegcJHzEbh70Y0Q',
	REST_API_KEY:'XCfQDPODgNB1HqmaCQgKLPWGxQ0lCUxqffzzURJY'
})

.value('BACKEND',{
	// Fill backend url here
	URL: 'http://ibmers.mybluemix.net/api/'
})

.service('LoginService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		changePassword: function(token,data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			console.log("hehe")
			console.log(data);
			$http.put(BACKEND.URL+'Employees/updatePassword?access_token='+token,data,{headers:{'Content-Type':'application/json'}}).success(function(response){
				deferred.resolve(response);
			}).error(function(response,error){
				if(error == 500){
					deferred.reject(error);
				}else{
					deferred.reject(error);
				}
			});			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}

			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}

			return promise;
		},
		loginUser: function(username,password){
			var deferred = $q.defer();
			var promise = deferred.promise;
			var data = "username="+username+"&password="+password;
			console.log(data);
			$http.post(BACKEND.URL+'/Employees/login',data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).success(function(response){
				deferred.resolve(response);
			}).error(function(response,error){
				if(error == 500){
					deferred.reject('Periksa kembali username dan password anda.');
				}else{
					deferred.reject('Harap coba kembali beberapa saat lagi.');
				}
			});	
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		getUser: function(id,token) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Employees/'+id+'?access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		editUser: function(id,token,data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/Employees/'+id+'?access_token='+token,data,{headers:{'Content-Type':'application/json'}}).success(function(response){
				deferred.resolve(response);
			}).error(function(response,error){
				if(error == 500){
					deferred.reject(error);
				}else{
					deferred.reject(error);
				}
			});			

			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}

			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}

			return promise;
		},
		getSeenCounter: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'Employees/seenCounter?employeeId='+id).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getLikeCounter: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'Employees/likeCounter?employeeId='+id).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getSharedCounter: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'Employees/sharedCounter?employeeId='+id).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getLeaderboard: function(token) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Employees/getLeaderboard?access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},								
	}
})
.service('ProfileService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		getProfile: function(id,token){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Employees/'+id+'?access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		editProfile: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/customer_profiles',data,
				{ headers: { 'Content-Type': 'application/json' } }
				).success(function(response){
					deferred.resolve(response);
				}).error(function(response,error){
					if(error == 500){
						deferred.reject('Periksa kembali email dan password anda.');
					}else{
						deferred.reject('Harap coba kembali beberapa saat lagi.');
					}
				});						
				promise.success = function(fn){
					promise.then(fn);
					return promise;
				}
				promise.error = function(fn){
					promise.then(null, fn);
					return promise;
				}
				return promise;
			}
		}
	})

.service('RegisterService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		tambahUser: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.post(BACKEND.URL+'/Employees',data,{ headers: { 'Content-Type': 'application/json' } }).success(function(response){
				deferred.resolve(response);
			}).error(function(response,error){
				if(error == 500){
					deferred.reject(error);
				}else{
					deferred.reject(error);
				}
			});				
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		}
	}
})

.service('MessageService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		getMessage: function(sender,receiver){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Messages/getMessage?sender='+sender+'&receiver='+receiver).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getContacts: function(token){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Employees/getContacts?access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getMessageBySender: function(sender,receiver,receiver2,sender2){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Messages/findOne?filter=%7B%22where%22%3A%7B%22or%22%3A%20%5B%7B%22sender%22%3A%22'+sender+'%22%2C%22receiver%22%3A%22'+receiver+'%22%7D%2C%7B%22sender%22%3A%22'+receiver2+'%22%2C%22receiver%22%3A%22'+sender2+'%22%7D%5D%7D%2C%22order%22%3A%22date%20DESC%22%7D').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},

	}
})

.service('PostService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		addMessage: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.post(BACKEND.URL+'/Messages',data,{ headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});				
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		addPost: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.post(BACKEND.URL+'/Posts/addPost',data,{ headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});				
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		// getCategory: function() {
		// 	var deferred = $q.defer();
		// 	var promise = deferred.promise;
		// 	$http.get(BACKEND.URL+'/Posts?filter=%7B%22order%22%3A%22date%20DESC%22%7D&access_token='+token).success(function(response){
		// 		deferred.resolve(response);
		// 	}).error(function(response){
		// 		deferred.reject(response);
		// 	});
		// 	promise.success = function(fn){
		// 		promise.then(fn);
		// 		return promise;
		// 	}
		// 	promise.error = function(fn){
		// 		promise.then(null, fn);
		// 		return promise;
		// 	}
		// 	return promise;
		// },
		getAll: function(token) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Posts?filter=%7B%22order%22%3A%22date%20DESC%22%7D&access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getPostByRole: function(role) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Posts?filter=%7B%22order%22%3A%22date%20desc%22%2C%22where%22%3A%20%7B%22or%22%3A%5B%7B%22div_'+role+'%22%3Atrue%7D%2C%20%7B%22div_all%22%3Atrue%7D%5D%7D%7D').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getMostLikedPost: function(token) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.post(BACKEND.URL+'/Posts/getMostLikedPost?access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getMostCommentedPost: function(token) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.post(BACKEND.URL+'/Posts/getMostCommentedPost?access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getMostSharedPost: function(token){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.post(BACKEND.URL+'/Posts/getMostSharedPost?access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getPost: function(id,token){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Posts/'+id+'?access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getComment: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Posts/'+id+'/comments?filter=%7B%22order%22%3A%22date%20asc%22%7D').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
			},
		getCommentCount: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Posts/'+id+'/comments/count').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
			},
		getLike: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Posts/'+id+'/likes').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
			},
		getLikeCount: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Posts/'+id+'/likes/count?where=%7B%22likeStatus%22%3A%22true%22%7D').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
			},			
		getUser: function(id,token) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Employees/'+id+'?access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getEmployeeByUsername: function(username) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Employees/getEmployee?username='+username).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		tambahKomentar: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.post(BACKEND.URL+'Comments',data, { headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});				
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		addKomentar: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/Employees/addComment',data, { headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});		

			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		addLike: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/Employees/addLike',data, { headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});		

			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		addLiker: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/Posts/addLiker',data, { headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});				
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		addShared: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/Employees/addShared',data, { headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});		

			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		addSharer: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/Posts/addSharer',data, { headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});				
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		addSeen: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/Employees/addSeen',data, { headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});		

			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		addSeer: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/Posts/addSeer',data, { headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});				
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		getLikeCounter: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'Posts/likerCounter?postId='+id).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getSharerCounter: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'Posts/sharerCounter?postId='+id).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},		
		addUnlike: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/Employees/addUnlike',data, { headers: { 'Content-Type': 'application/json' } }).success(function(response){
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});				
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		addUnliker: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/Posts/addUnliker',data, { headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});				
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		}
		}
	})



