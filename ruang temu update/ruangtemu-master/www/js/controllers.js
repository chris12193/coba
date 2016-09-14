angular.module('starter.controllers', ['ngCordova','ionic'])

.controller('LoginCtrl', function($scope, ionicMaterialInk, $window, LoginService, $ionicPopup, $ionicLoading, $state) {
    ionicMaterialInk.displayEffect();
    $scope.data = {};
 
    $scope.login = function() {
		$ionicLoading.show({
			content: 'Login...',
			animation: 'fade-in',
			showBackdrop: true,
		});
		if($scope.data.username==""){
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Login failed!',
				template: 'Please fill your username'
			});

		}
		else if($scope.data.username!=""){
			LoginService.loginUser($scope.data.username,$scope.data.password).success(function(data) {
				$ionicLoading.hide();
				localStorage.setItem("userid",data.userId);
				localStorage.setItem("token",data.id);
				$state.go('app.home');

			}).error(function(data) {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'Login Failed!',
					template: 'Your username is not in our database'
				});
			});
		}
		else{
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Login Failed!',
				template: 'Please fill your username'
			});
		}
	}
})

.controller('MainCtrl', function($scope, $ionicPopup,$ionicTabsDelegate,$ionicLoading,$ionicPopover, $state,ProfileService) {
	if(localStorage.getItem("userid")==null || localStorage.getItem("userid")==""){
		$state.go('login');
	}else{
	$scope.menuProfile = {};
	$scope.currentLocation = {};

	//do before main view loaded
	$scope.$on('$ionicView.beforeEnter', function(){
		//get user profile data
	
		ProfileService.getProfile(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(data) {
			$scope.menuProfile = data;
			$scope.menuProfile.password="";
			$ionicLoading.hide();
		}).error(function(data) {
			$ionicLoading.hide();
			// var alertPopup = $ionicPopup.alert({
			// 	title: 'Request Failed!',
			// 	template: 'Error get user profile data'
			// });
		});
	});
	$scope.back = function(){
		$state.go('app.home');
	}
	$scope.backProfile = function(){
		$state.go('app.profile');
	}
	$scope.logout = function(){
		localStorage.removeItem("username");
		$state.go('login');
	};
	}
})
.controller('HomeCtrl', function($scope, $state, $stateParams, $ionicPopup, $ionicPlatform, $ionicLoading, PostService, $cordovaSocialSharing, $window, $ionicModal) { 
	 $scope.formSeen={};
	 $scope.formSeer={};

	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	$scope.doRefresh = function() {
		$scope.$broadcast('scroll.refreshComplete');
		setTimeout(function (){
			$state.go($state.current, {}, {reload: true});
		}, 500);
	};
	$ionicLoading.hide();

	$scope.profile = {};
	PostService.getUser(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(data) {
		$scope.profile = data;
		$scope.formSeen.employeeId = $scope.profile.id;
		$scope.formSeer.employeeUsername = $scope.profile.username;
		$scope.profile.password="";
		$ionicLoading.hide();

		PostService.getPostByRole($scope.profile.role).success(function(data) {
			$ionicLoading.hide();

			$scope.arr = [];
			for (var item in data) { 
			   $scope.arr.push(data[item]); 
			}
			console.log($scope.arr);
			
			data.forEach(function(entry) {	

			    // Comment Count
				PostService.getCommentCount(entry.id).success(function(datatmp) {
					$ionicLoading.hide();
					$scope.jumlahKomentar=datatmp;
					if($scope.jumlahKomentar.count==0){
						$scope.jumlahKomentar.count="";
					}

					entry.jumlahKomentar = $scope.jumlahKomentar.count;

				}).error(function(datatmp) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah komentar post'
					// });
				});

			});

			data.forEach(function(entry) {
			 
				PostService.getLikeCounter(entry.id).success(function(datalike) {
					$ionicLoading.hide();
					$scope.jumlahLike=datalike;
					if($scope.jumlahLike.count==0){
						$scope.jumlahLike.count="";
					}

					entry.jumlahLike = $scope.jumlahLike.count;

				}).error(function(datalike) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah like post'
					// });
				});

			});

			data.forEach(function(entry) {
			   
				PostService.getSharerCounter(entry.id).success(function(datashare) {
					$ionicLoading.hide();
					$scope.jumlahSharer=datashare;
					if($scope.jumlahSharer.count==0){
						$scope.jumlahSharer.count="";
					}
					entry.jumlahSharer = $scope.jumlahSharer.count;

				}).error(function(datashare) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah share post'
					// });
				});

			});
			
		}).error(function(data) {
			$ionicLoading.hide();
			// var alertPopup = $ionicPopup.alert({
			// 	title: 'Error!',
			// 	template: 'Tidak dapat mengambil data post'
			// });
		});

		$scope.selection = function(division){
			PostService.getPostByRole(division).success(function(data) {
				$ionicLoading.hide();

				$scope.arr = [];
				for (var item in data) { 
				   $scope.arr.push(data[item]); 

				}
				console.log($scope.arr);
				
				data.forEach(function(entry) {	

				    // Comment Count
					PostService.getCommentCount(entry.id).success(function(datatmp) {
						$ionicLoading.hide();
						$scope.jumlahKomentar=datatmp;
						if($scope.jumlahKomentar.count==0){
							$scope.jumlahKomentar.count="";
						}

						entry.jumlahKomentar = $scope.jumlahKomentar.count;

					}).error(function(datatmp) {
						$ionicLoading.hide();
						// var alertPopup = $ionicPopup.alert({
						// 	title: 'Get Data Failed!',
						// 	template: 'Gagal ambil jumlah komentar post'
						// });
					});

				});

				data.forEach(function(entry) {
				 
					PostService.getLikeCounter(entry.id).success(function(datalike) {
						$ionicLoading.hide();
						$scope.jumlahLike=datalike;
						if($scope.jumlahLike.count==0){
							$scope.jumlahLike.count="";
						}

						entry.jumlahLike = $scope.jumlahLike.count;

					}).error(function(datalike) {
						$ionicLoading.hide();
						// var alertPopup = $ionicPopup.alert({
						// 	title: 'Get Data Failed!',
						// 	template: 'Gagal ambil jumlah like post'
						// });
					});

				});

				data.forEach(function(entry) {
				   
					PostService.getSharerCounter(entry.id).success(function(datashare) {
						$ionicLoading.hide();
						$scope.jumlahSharer=datashare;
						if($scope.jumlahSharer.count==0){
							$scope.jumlahSharer.count="";
						}

						entry.jumlahSharer = $scope.jumlahSharer.count;

					}).error(function(datashare) {
						$ionicLoading.hide();
						// var alertPopup = $ionicPopup.alert({
						// 	title: 'Get Data Failed!',
						// 	template: 'Gagal ambil jumlah share post'
						// });
					});

				});
				
			}).error(function(data) {
				$ionicLoading.hide();
				// var alertPopup = $ionicPopup.alert({
				// 	title: 'Error!',
				// 	template: 'Tidak dapat mengambil data post'
				// });
			});
		}

	}).error(function(data) {
		$ionicLoading.hide();
		// var alertPopup = $ionicPopup.alert({
		// 	title: 'Error!',
		// 	template: 'Tidak dapat mengambil profil!'
		// });
	});
	
	$scope.mostLiked={};
	PostService.getMostLikedPost(localStorage.getItem("token")).success(function(dataLike) {
		$scope.mostLiked = dataLike;
		$ionicLoading.hide();

		 // Comment Count
				PostService.getCommentCount($scope.mostLiked.id).success(function(datatmp) {
					$ionicLoading.hide();
					$scope.jumlahKomentar=datatmp;
					if($scope.jumlahKomentar.count==0){
						$scope.jumlahKomentar.count="";
					}

					$scope.mostLiked.jumlahKomentar = $scope.jumlahKomentar.count;

				}).error(function(datatmp) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah komentar post'
					// });
				});


				PostService.getLikeCounter($scope.mostLiked.id).success(function(datalike) {
					$ionicLoading.hide();
					$scope.jumlahLike=datalike;
					if($scope.jumlahLike.count==0){
						$scope.jumlahLike.count="";
					}

					$scope.mostLiked.jumlahLike = $scope.jumlahLike.count;

				}).error(function(datalike) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah like post'
					// });
				});


				PostService.getSharerCounter($scope.mostLiked.id).success(function(datashare) {
					$ionicLoading.hide();
					$scope.jumlahSharer=datashare;
					if($scope.jumlahSharer.count==0){
						$scope.jumlahSharer.count="";
					}

					$scope.mostLiked.jumlahSharer = $scope.jumlahSharer.count;

				}).error(function(datashare) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah share post'
					// });
				});
	}).error(function(dataLike) {
		$ionicLoading.hide();
		// var alertPopup = $ionicPopup.alert({
		// 	title: 'Error!',
		// 	template: 'Failed to get most liked post'
		// });
	});

	$scope.mostCommented={};
	PostService.getMostCommentedPost(localStorage.getItem("token")).success(function(dataComment) {
		$scope.mostCommented = dataComment;
		$ionicLoading.hide();
		
		 // Comment Count
				PostService.getCommentCount($scope.mostCommented.id).success(function(datatmp) {
					$ionicLoading.hide();
					$scope.jumlahKomentar=datatmp;
					if($scope.jumlahKomentar.count==0){
						$scope.jumlahKomentar.count="";
					}

					$scope.mostCommented.jumlahKomentar = $scope.jumlahKomentar.count;

				}).error(function(datatmp) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah komentar post'
					// });
				});


				PostService.getLikeCounter($scope.mostCommented.id).success(function(datalike) {
					$ionicLoading.hide();
					$scope.jumlahLike=datalike;
					if($scope.jumlahLike.count==0){
						$scope.jumlahLike.count="";
					}

					$scope.mostCommented.jumlahLike = $scope.jumlahLike.count;

				}).error(function(datalike) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah like post'
					// });
				});


				PostService.getSharerCounter($scope.mostCommented.id).success(function(datashare) {
					$ionicLoading.hide();
					$scope.jumlahSharer=datashare;
					if($scope.jumlahSharer.count==0){
						$scope.jumlahSharer.count="";
					}

					$scope.mostCommented.jumlahSharer = $scope.jumlahSharer.count;

				}).error(function(datashare) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah share post'
					// });
				});

	}).error(function(dataLike) {
		$ionicLoading.hide();
		// var alertPopup = $ionicPopup.alert({
		// 	title: 'Error!',
		// 	template: 'Failed to get most commented post'
		// });
	});

	$scope.mostShared={};
	PostService.getMostSharedPost(localStorage.getItem("token")).success(function(dataShare) {
		$scope.mostShared = dataShare;
		$ionicLoading.hide();

			    // Comment Count
				PostService.getCommentCount($scope.mostShared.id).success(function(datatmp) {
					$ionicLoading.hide();
					$scope.jumlahKomentar=datatmp;
					if($scope.jumlahKomentar.count==0){
						$scope.jumlahKomentar.count="";
					}

					$scope.mostShared.jumlahKomentar = $scope.jumlahKomentar.count;

				}).error(function(datatmp) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah komentar post'
					// });
				});


				PostService.getLikeCounter($scope.mostShared.id).success(function(datalike) {
					$ionicLoading.hide();
					$scope.jumlahLike=datalike;
					if($scope.jumlahLike.count==0){
						$scope.jumlahLike.count="";
					}

					$scope.mostShared.jumlahLike = $scope.jumlahLike.count;

				}).error(function(datalike) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah like post'
					// });
				});


				PostService.getSharerCounter($scope.mostShared.id).success(function(datashare) {
					$ionicLoading.hide();
					$scope.jumlahSharer=datashare;
					if($scope.jumlahSharer.count==0){
						$scope.jumlahSharer.count="";
					}

					$scope.mostShared.jumlahSharer = $scope.jumlahSharer.count;

				}).error(function(datashare) {
					$ionicLoading.hide();
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Get Data Failed!',
					// 	template: 'Gagal ambil jumlah share post'
					// });
				});


	}).error(function(dataShare) {
		$ionicLoading.hide();
		// var alertPopup = $ionicPopup.alert({
		// 	title: 'Error!',
		// 	template: 'Failed to get most shared post'
		// });
	});

	$scope.postDetail = function(id){
	 
	  			$scope.formSeen.postId=id;
				$scope.formSeer.postId=id;

				PostService.addSeen($scope.formSeen).success(function(data) {
					$ionicLoading.hide();
					
				}).error(function(data) {
					$ionicLoading.hide();
					
				});

				PostService.addSeer($scope.formSeer).success(function(data) {
					$ionicLoading.hide();
					
				}).error(function(data) {
					$ionicLoading.hide();
					
				});
	  $state.go('app.post', {'dataId': id});
	 
	};

	$scope.userDetail = function(username){
	 
	  $state.go('app.userProfile', {'username': username});
	 
	};

})

.controller('PostDetailCtrl', function($scope, $state, $stateParams, $ionicPopup, $ionicPlatform, $ionicLoading, PostService, ionicMaterialInk, ionicMaterialMotion, $cordovaSocialSharing) {  
	//implement logic here
	ionicMaterialInk.displayEffect();
	$scope.itemData={};
	$scope.$on('$ionicView.enter', function(){
		$scope.checked = false;
		$scope.profile = {};
		$scope.formKomentar={};
		$scope.formLike={};
		$scope.formLiker={};
		$scope.formShared={};
		$scope.formSharer={};
		console.log($stateParams.dataId);
		PostService.getPost($stateParams.dataId).success(function(data) {
			$scope.itemData=data;
		
			PostService.getUser(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(data) {
			$scope.profile = data;
	
			$scope.formKomentar.employeeId = $scope.profile.id;		
			$scope.formKomentar.employeeName = $scope.profile.name;
			$scope.formKomentar.date = moment().format();
			$scope.formLike.employeeId = $scope.profile.id;
			$scope.formLiker.employeeUsername = $scope.profile.name;
			$scope.formShared.employeeId = $scope.profile.id;
			$scope.formSharer.employeeUsername = $scope.profile.name;
			$scope.profile.password="";
			
			$ionicLoading.hide();

			$scope.postLikedArray = $scope.itemData.liker.split(',');
			
			for(var i = 0; i < $scope.postLikedArray.length; i++){
				
				if($scope.postLikedArray[i] === $scope.profile.name){
					$scope.checked = true;
					
				}
			}
			}).error(function(data) {
				$ionicLoading.hide();
				// var alertPopup = $ionicPopup.alert({
				// 	title: 'Error!',
				// 	template: 'Tidak dapat mengambil profil!'
				// });
			});


			//Komentar 
			PostService.getComment(data.id).success(function(data) {
				$ionicLoading.hide();
				$scope.komentar=data;
				console.log(data);
			}).error(function(data) {
				$ionicLoading.hide();
				// var alertPopup = $ionicPopup.alert({
				// 	title: 'Get Data Failed!',
				// 	template: 'Gagal ambil komentar post'
				// });
			});

			PostService.getCommentCount(data.id).success(function(data) {
				$ionicLoading.hide();
				$scope.jumlahKomentar=data;
				if($scope.jumlahKomentar.count==0){
					$scope.jumlahKomentar.count="";
					
				}

			}).error(function(data) {
				$ionicLoading.hide();
				// var alertPopup = $ionicPopup.alert({
				// 	title: 'Get Data Failed!',
				// 	template: 'Gagal ambil jumlah komentar post'
				// });
			});
			//Komentar 

			PostService.getLikeCounter(data.id).success(function(data) {
				$ionicLoading.hide();
				$scope.jumlahLike=data;
				if($scope.jumlahLike.count==0){
					$scope.jumlahLike.count="";
					
				}
			
			}).error(function(data) {
				$ionicLoading.hide();
				// var alertPopup = $ionicPopup.alert({
				// 	title: 'Get Data Failed!',
				// 	template: 'Gagal ambil jumlah like post'
				// });
			});

			PostService.getSharerCounter(data.id).success(function(data) {
				$ionicLoading.hide();
				$scope.jumlahSharer=data;
				if($scope.jumlahSharer.count==0){
					$scope.jumlahSharer.count="";
					
				}
			
			}).error(function(data) {
				$ionicLoading.hide();
				// var alertPopup = $ionicPopup.alert({
				// 	title: 'Get Data Failed!',
				// 	template: 'Gagal ambil jumlah share post'
				// });
			});

			$scope.shareNative = function() {

				$scope.formShared.postId=$scope.itemData.id;
				$scope.formSharer.postId=$scope.itemData.id;

				PostService.addShared($scope.formShared).success(function(data) {
					$ionicLoading.hide();
					
					$state.go($state.current, {}, {reload: true});
				}).error(function(data) {
					$ionicLoading.hide();
					
				});

				PostService.addSharer($scope.formSharer).success(function(data) {
					$ionicLoading.hide();
					
					$state.go($state.current, {}, {reload: true});
				}).error(function(data) {
					$ionicLoading.hide();
					
				});

		     $ionicPlatform.ready(function() {
			  console.log($cordovaSocialSharing);
				  
			  $cordovaSocialSharing
			    .share($scope.itemData.content, $scope.itemData.title, $scope.itemData.photo, "www.ruangtemu.com") // Share via native share sheet
			    .then(function(result) {
			      // Success!
			       console.log("success");
			    }, function(err) {
			      // An error occured. Show a Message to the user
			      console.log("failed");
			    });

			    $cordovaSocialSharing
			    .shareViaInstagram($scope.itemData.content, $scope.itemData.photo, "www.ruangtemu.com")
			    .then(function(result) {
			      // Success!
			       console.log("success");
			    }, function(err) {
			      // An error occurred. Show a Message to the user
			       console.log("failed");
			    });

			  // access multiple numbers in a string like: '0612345678,0687654321'
			  $cordovaSocialSharing
			    .shareViaSMS($scope.itemData.content, '089521000542')
			    .then(function(result) {
			      // Success!
			       console.log("success");

			    }, function(err) {
			      // An error occurred. Show a Message to the user
			       console.log("failed");
			    });

			// toArr, ccArr and bccArr must be an array, file can be either null, string or array
			  $cordovaSocialSharing
			    .shareViaEmail(Message, subject, toArr, ccArr, ['bcc', 'bcc'], null)
			    .then(function(result) {
			      // Success!
			       console.log("success");

			    }, function(err) {
			      // An error occurred. Show a Message to the user
			       console.log("failed");
			    });

			    $cordovaSocialSharing
			    .canShareVia('instagram', 'msg', null, null)
			    .then(function(result) {
			      // Success!
			       console.log("success");

			    }, function(err) {
			      // An error occurred. Show a Message to the user
			       console.log("failed");
			    });

			  $cordovaSocialSharing
			    .canShareViaEmail()
			    .then(function(result) {
			      // Yes we can
			       console.log("success");

			    }, function(err) {
			      // Nope
			       console.log("failed");
			    });
		});
		}
		})
		.error(function(data) {
			$ionicLoading.hide();
			// var alertPopup = $ionicPopup.alert({
			// 	title: 'Get Data Failed!',
			// 	template: 'Gagal ambil data post'
			// });
		});

		//Komentar
		$scope.formKomentar={};
			$scope.addKomentar = function(){
			$scope.formKomentar.postId=$scope.itemData.id;

			PostService.addKomentar($scope.formKomentar).success(function(data) {
				$ionicLoading.hide();
				$state.go($state.current, {}, {reload: true});
			}).error(function(data) {
				$ionicLoading.hide();
			});
		}
		//Komentar
		
		$scope.addLike = function(){
			$scope.checked=true;			
			$scope.formLike.postId=$scope.itemData.id;
			$scope.formLiker.postId=$scope.itemData.id;
			PostService.addLike($scope.formLike).success(function(data) {
				$ionicLoading.hide();
				$scope.jumlahLike.count+=1;
			}).error(function(data) {
				$ionicLoading.hide();
			});

			PostService.addLiker($scope.formLiker).success(function(data) {
				$ionicLoading.hide();
				
			}).error(function(data) {
				$ionicLoading.hide();
				
			});
		}

		$scope.addUnlike = function(){
			$scope.checked=false;

			$scope.formLike.postId=$scope.itemData.id;
			$scope.formLiker.postId=$scope.itemData.id;
			
			PostService.addUnlike($scope.formLike).success(function(data) {
				$ionicLoading.hide();
				$scope.jumlahLike.count-=1;
			}).error(function(data) {
				$ionicLoading.hide();
				
			});

			PostService.addUnliker($scope.formLiker).success(function(data) {
				$ionicLoading.hide();
			}).error(function(data) {
				$ionicLoading.hide();
				
			});
		}
		
		//Like

	});
})

.controller('Forgot_passwordCtrl', function($scope, $state, $ionicPopup, $ionicPlatform,$ionicLoading) {  
	//implement logic here
})

.controller('RegisterCtrl', function($scope, $state, RegisterService, $ionicPopup, $ionicPlatform,$ionicLoading) {  
	//implement logic here
	$scope.data={};
	$scope.data.postLiked = "";
	$scope.data.postShared = "";
	$scope.data.postSeen = "";
	$scope.data.badges = [{}];
	$scope.data.badgeCount = 0;
	$scope.data.poin = 0;
	$scope.register = function(){
		RegisterService.tambahUser($scope.data).success(function(data) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Succes!',
				template: 'Berhasil register'
			});
			$state.go('login');
		}).error(function(data) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Post Data Failed!',
				template: 'Gagal register'
			});
		});
	}
})

.controller('Create_postCtrl', function($scope, $state, PostService, $ionicPopup, $ionicPlatform, $ionicLoading, $cordovaImagePicker, $cordovaCamera) {  
	//implement logic here
    $scope.data={};
    // Setting of uploaded image
	document.addEventListener("deviceready", function () {
		$scope.uploadImage = function() {
			var options = {
				maximumImagesCount: 1,
				width: 600,
				height: 600,
				quality: 100
			};

			$cordovaImagePicker.getPictures(options).then(function (results) {
				for (var i = 0; i < results.length; i++) {
					$scope.image = results[i];
					
					window.plugins.Base64.encodeFile($scope.image, function(base64){  // Encode URI to Base64 needed for contacts plugin
                        $scope.data.photo = base64;
						$scope.data.photo = $scope.data.foto.replace(/(\r\n|\n|\r)/gm,"");
						
                    });
				}
			}, function(error) {
				$scope.data.photo="n/a"
			});
		}
	}, false);
	// Get user identity
	$scope.profile = {};
	PostService.getUser(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(data) {
		$scope.profile = data;
		$scope.data.writer = $scope.profile.username;
		$scope.data.employee = $scope.profile.id;
		$scope.profile.password="";

		$ionicLoading.hide();
	}).error(function(data) {
		$ionicLoading.hide();
		// var alertPopup = $ionicPopup.alert({
		// 	title: 'Error!',
		// 	template: 'Tidak dapat mengambil profil!'
		// });
	});	
	// Declare division variable
	$scope.division = {};
	// Declare tag variable
	$scope.tag = {};
	// Get division list in database
	// PostService.getCategory().success(function(data) {
	// 	$scope.profile = data;
	// 	$scope.data.writer = $scope.profile.username;
	// 	$scope.data.employee = $scope.profile.id;
	// 	$scope.profile.password="";

	// 	$ionicLoading.hide();
	// }).error(function(data) {
	// 	$ionicLoading.hide();
	// 	// var alertPopup = $ionicPopup.alert({
	// 	// 	title: 'Error!',
	// 	// 	template: 'Tidak dapat mengambil profil!'
	// 	// });
	// });	
	$scope.data.date = moment().format();
	$scope.data.seen = "";
	$scope.data.liker = "";
	$scope.data.sharer = "";	
	$scope.addPost = function(){
		PostService.addPost($scope.data).success(function(data) {
			$ionicLoading.hide();
			localStorage.setItem("postid",data.id);			
			// var alertPopup = $ionicPopup.alert({
			// 	title: 'Succes!',
			// 	template: 'Berhasil buat post'
			// });
			$state.go('app.home');

		}).error(function(data) {
			$ionicLoading.hide();		
			// var alertPopup = $ionicPopup.alert({
			// 	title: 'Post Data Failed!',
			// 	template: 'Gagal buat post'
			// });
		});
	}
})

.controller('ProfileCtrl', function($scope, $state, $ionicPopup, $ionicPlatform, $ionicLoading, LoginService, $cordovaImagePicker, $cordovaCamera) {  
	//implement logic here
	$scope.profile = {};
	document.addEventListener("deviceready", function () {
		$scope.uploadImage = function() {
			var options = {
				maximumImagesCount: 1,
				width: 600,
				height: 600,
				quality: 100
			};

			$cordovaImagePicker.getPictures(options).then(function (results) {
				for (var i = 0; i < results.length; i++) {
					$scope.image = results[i];
					
					window.plugins.Base64.encodeFile($scope.image, function(base64){  // Encode URI to Base64 needed for contacts plugin
                        $scope.profile.photo = base64;
						$scope.profile.photo = $scope.profile.foto.replace(/(\r\n|\n|\r)/gm,"");
						
                    });
				}
			}, function(error) {
				$scope.profile.photo="n/a"
			});
		}
	}, false);

	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	
	});
	
	LoginService.getUser(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(data) {
		$scope.profile = data;
		$scope.badge = {};
		$ionicLoading.hide();

		data.badges.sort(function(a, b){
		    var dateA=new Date(a.achieved_date), dateB=new Date(b.achieved_date)
		    return dateB-dateA //sort by date ascending
		})

		console.log(data.badges);
		$scope.badge = data.badges[0];
	
		 $scope.editProfil = function(){
		 
		 	$scope.profile = data;
	    	LoginService.editUser(localStorage.getItem("userid"),localStorage.getItem("token"),data).success(function(data) {
	    		$ionicLoading.hide();
	    		$scope.profile = data;
	    		// var alertPopup = $ionicPopup.alert({
	    		// 	title: 'Edit Data Berhasil!',
	    		// 	template: 'Edit data profil berhasil dilakukan'
	    		// });
	    		$state.go('app.profile');
	    	}).error(function(data) {
	    		$ionicLoading.hide();
	    		// var alertPopup = $ionicPopup.alert({
	    		// 	title: 'Get Data Failed!',
	    		// 	template: 'Gagal edit profil'
	    		// });
	    	});
	    }

	}).error(function(data) {
		$ionicLoading.hide();
		// var alertPopup = $ionicPopup.alert({
		// 	title: 'Error!',
		// 	template: 'Tidak dapat mengambil profil!'
		// });
	});
	$scope.changePassword = function(){
		
		LoginService.changePassword(localStorage.getItem("token"),$scope.formCP).success(function(data) {
	   		$ionicLoading.hide();
	   		console.log(data);
	   		console.log("aaaa");
	   		//$scope.profile = data;
	   		// var alertPopup = $ionicPopup.alert({
    		// 	title: 'Edit Password Berhasil!',
    		// 	template: 'Edit Password berhasil dilakukan'
	   		// });
	   		$state.go('app.home');
		}).error(function(data) {
		   		$ionicLoading.hide();
		    	console.log("a");
		 //    	var alertPopup = $ionicPopup.alert({
			// 	title: 'Get Data Failed!',
			// 	template: 'Gagal edit password'
			// });
		});
	}

})

.controller('UserProfileCtrl', function($scope, $state, $ionicPopup, $ionicPlatform, $ionicLoading, PostService, $cordovaImagePicker, $cordovaCamera, $stateParams) {  
	//implement logic here
	$scope.profile = {};
	document.addEventListener("deviceready", function () {
		$scope.uploadImage = function() {
			var options = {
				maximumImagesCount: 1,
				width: 600,
				height: 600,
				quality: 100
			};

			$cordovaImagePicker.getPictures(options).then(function (results) {
				for (var i = 0; i < results.length; i++) {
					$scope.image = results[i];
					
					window.plugins.Base64.encodeFile($scope.image, function(base64){  // Encode URI to Base64 needed for contacts plugin
                        $scope.profile.photo = base64;
						$scope.profile.photo = $scope.profile.foto.replace(/(\r\n|\n|\r)/gm,"");
						
                    });
				}
			}, function(error) {
				$scope.profile.photo="n/a"
			});
		}
	}, false);

	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	
	});
	console.log($stateParams.username);
	localStorage.setItem("MessageUsername",$stateParams.username);
	PostService.getEmployeeByUsername($stateParams.username).success(function(data) {
		$scope.profile = data;
		$scope.badge = {};
		$ionicLoading.hide();

		data.badges.sort(function(a, b){
		    var dateA=new Date(a.achieved_date), dateB=new Date(b.achieved_date)
		    return dateB-dateA //sort by date ascending
		})

		console.log(data.badges);
		$scope.badge = data.badges[0];

	}).error(function(data) {
		$ionicLoading.hide();
		// var alertPopup = $ionicPopup.alert({
		// 	title: 'Error!',
		// 	template: 'Tidak dapat mengambil profil!'
		// });
	});

	$scope.userDetail = function(username){
	 
	  $state.go('app.Message_detail', {'username': username});
	 
	};

})

.controller('LeaderboardCtrl', function($scope, $state, $ionicPopup, $ionicPlatform, $ionicLoading, LoginService, ProfileService) {  
	//implement logic here
	$scope.leaderboard = {};
	$scope.pemenangPertama = {};
	$scope.pemenangKedua = {};
	$scope.pemenangKetiga = {};
	$scope.myLeaderboard = {};
	$scope.myLeaderboardend = false;
	$scope.menuProfile = {}
	$scope.data = {}

	LoginService.getLeaderboard(localStorage.getItem("token")).success(function(data) {

		ProfileService.getProfile(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(dataprofile) {
			$scope.menuProfile = dataprofile;
			$scope.menuProfile.password="";
			$ionicLoading.hide();
			var i = 1;

			data.forEach(function(entry) {	

				if($scope.menuProfile.username === entry.username){
					// console.log("hai");
					$scope.myLeaderboard = entry;
				}
				if($scope.menuProfile.username === entry.username && i>10){
					// console.log("hai");
					$scope.myLeaderboardend = true;
					$scope.myLeaderboard.position = i;
				}
				i++;

			});

			
		}).error(function(dataprofile) {
			$ionicLoading.hide();
			// var alertPopup = $ionicPopup.alert({
			// title: 'Request Failed!',
			// template: 'Error get user profile data'
			// });
		});

		$scope.leaderboard = data;
		console.log(data);
		$ionicLoading.hide();

		$scope.pemenangPertama = data[0];
		$scope.pemenangKedua = data[1];
		$scope.pemenangKetiga = data[2];
		console.log($scope.pemenangPertama);


	}).error(function(data) {
		$ionicLoading.hide();
		// var alertPopup = $ionicPopup.alert({
		// 	title: 'Error!',
		// 	template: 'Tidak dapat mengambil data leaderboard'
		// });
	});
})

.controller('MessageCtrl', function($scope, $state, $ionicPopup, $ionicPlatform, $ionicLoading, LoginService, PostService, MessageService, $stateParams) {  
	$scope.Message = {};
	$scope.otherProfile = {};
	$scope.profile = {};
	$scope.dataMessage = {};
	$scope.contacts = {};
	$scope.showme = false;
	$scope.historyMessage = {};
	$scope.arrMessage = [];


	LoginService.getUser(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(data) {
		$scope.profile = data;
		$ionicLoading.hide();

		console.log(localStorage.getItem("MessageUsername"));
		PostService.getEmployeeByUsername(localStorage.getItem("MessageUsername")).success(function(data) {
			$scope.otherProfile = data;
			$ionicLoading.hide();
			console.log($scope.otherProfile);

			MessageService.getMessage($scope.profile.username,localStorage.getItem("MessageUsername")).success(function(data) {
			$scope.Message = data;
			$ionicLoading.hide();
			console.log($scope.Message);

			data.sort(function(a, b){
		    var dateA=new Date(a.date), dateB=new Date(b.date)
		    return dateA-dateB //sort by date ascending
			})

			console.log(data);
			$scope.newMessage = data;
			
			}).error(function(data) {
				$ionicLoading.hide();
				// var alertPopup = $ionicPopup.alert({
				// 	title: 'Error!',
				// 	template: 'Tidak dapat mengambil Message'
				// });
			});

			$scope.dataMessage.sender = $scope.profile.username;
			$scope.dataMessage.receiver = localStorage.getItem("MessageUsername");
			$scope.dataMessage.date = moment().format();
			console.log($scope.dataMessage);
			$scope.addMessage = function(){
				PostService.addMessage($scope.dataMessage).success(function(data) {
					$ionicLoading.hide();
				}).error(function(data) {
					$ionicLoading.hide();
				
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Post Data Failed!',
					// 	template: 'Gagal buat Message'
					// });
				});
			}

		}).error(function(data) {
			$ionicLoading.hide();
			// var alertPopup = $ionicPopup.alert({
			// 	title: 'Error!',
			// 	template: 'Tidak dapat mengambil profil!'
			// });
		});

	}).error(function(data) {
		$ionicLoading.hide();
		// var alertPopup = $ionicPopup.alert({
		// 	title: 'Error!',
		// 	template: 'Tidak dapat mengambil profil!'
		// });
	});

	MessageService.getContacts(localStorage.getItem("token")).success(function(data) {
		$scope.contacts = data;
		$ionicLoading.hide();
		console.log($scope.contacts);

		for(item in $scope.contacts){
			console.log($scope.contacts[item].username);
			console.log($scope.profile.username);

			MessageService.getMessageBySender($scope.profile.username,$scope.contacts[item].username,$scope.contacts[item].username,$scope.profile.username).success(function(data) {
				$scope.historyMessage = data;
				$ionicLoading.hide();
				$scope.arrMessage.push(data); 
				console.log($scope.arrMessage);
				console.log($scope.historyMessage);
				console.log(data.receiver);
				if(data.receiver == $scope.profile.username){
					data.receiver = data.sender;
					console.log(data.receiver);
				}

			}).error(function(data) {
				$ionicLoading.hide();
				// var alertPopup = $ionicPopup.alert({
				// 	title: 'Error!',
				// 	template: 'Tidak dapat mengambil history'
				// });
			});
		}

	}).error(function(data) {
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
			title: 'Error!',
			template: 'Tidak dapat mengambil kontak'
		});
	});

	console.log('username');
	$scope.userDetail = function(username){
	 
	  $state.go('app.message_detail', {'username': username});
	 
	};

})

.controller('MessageDetailCtrl', function($scope, $state, $ionicPopup, $ionicPlatform, $ionicLoading, LoginService, PostService, MessageService, $stateParams) {  
	$scope.Message = {};
	$scope.otherProfile = {};
	$scope.profile = {};
	$scope.dataMessage = {};
	console.log($stateParams.username);
	LoginService.getUser(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(data) {
		$scope.profile = data;
		$ionicLoading.hide();

		PostService.getEmployeeByUsername($stateParams.username).success(function(data) {
			$scope.otherProfile = data;
			$ionicLoading.hide();
			console.log($scope.otherProfile);

			MessageService.getMessage($scope.profile.username,$stateParams.username).success(function(data) {
			$scope.Message = data;
			$ionicLoading.hide();
			console.log($scope.Message);

			data.sort(function(a, b){
		    var dateA=new Date(a.date), dateB=new Date(b.date)
		    return dateA-dateB //sort by date ascending
			})

			console.log(data);
			$scope.newMessage = data;
			
			}).error(function(data) {
				$ionicLoading.hide();
				// var alertPopup = $ionicPopup.alert({
				// 	title: 'Error!',
				// 	template: 'Tidak dapat mengambil Message'
				// });
			});

			$scope.dataMessage.sender = $scope.profile.username;
			$scope.dataMessage.receiver = $stateParams.username;
			$scope.dataMessage.date = moment().format();
			console.log($scope.dataMessage);
			$scope.addMessage = function(){
				PostService.addMessage($scope.dataMessage).success(function(data) {
					$ionicLoading.hide();
					
					$state.go($state.current, {}, {reload: true});

				}).error(function(data) {
					$ionicLoading.hide();
				
					// var alertPopup = $ionicPopup.alert({
					// 	title: 'Post Data Failed!',
					// 	template: 'Gagal buat Message'
					// });
				});
			}

		}).error(function(data) {
			$ionicLoading.hide();
			// var alertPopup = $ionicPopup.alert({
			// 	title: 'Error!',
			// 	template: 'Tidak dapat mengambil profil!'
			// });
		});

	}).error(function(data) {
		$ionicLoading.hide();
		// var alertPopup = $ionicPopup.alert({
		// 	title: 'Error!',
		// 	template: 'Tidak dapat mengambil profil!'
		// });
	});


})

.controller('Create_MessageCtrl', function($scope, PostService,$state, $ionicPopup, $ionicPlatform,$ionicLoading, LoginService) {  
	$scope.data={};
	

	LoginService.getUser(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(data) {
		$scope.profile = data;
		$ionicLoading.hide();
		$scope.data.sender = data.username;
		console.log($scope.data.sender);

		$scope.addMessage = function(){
		PostService.addMessage($scope.data).success(function(data) {
			$ionicLoading.hide();
			
			// var alertPopup = $ionicPopup.alert({
			// 	title: 'Succes!',
			// 	template: 'Berhasil buat post'
			// });
			$state.go('app.home');

		}).error(function(data) {
			$ionicLoading.hide();
		
			// var alertPopup = $ionicPopup.alert({
			// 	title: 'Post Data Failed!',
			// 	template: 'Gagal buat post'
			// });
		});
	}

	}).error(function(data) {
		$ionicLoading.hide();
		// var alertPopup = $ionicPopup.alert({
		// 	title: 'Error!',
		// 	template: 'Tidak dapat mengambil profil!'
		// });
	});

})