##in other to use this api u have to make sure u have internet and a git installed in your local ##machine then clone this repos and go to the terminal type 'npm install' to install all dependcies

#MODEL:
    post:{
        title,
        content,
        category:enum['social','politic','health','entertairnment'],
        file,
        auhor:objectId
        date
    }
    user :{
        name,
        email,
        password
    }
#END_POINT=['http:/localhost:5000/api/post']<=>{success:true,data: post | posts | "string"}:
       =>POST:
                router
                .route("/")
                .get(getPosts)
                .post(protectRoute, upload.single("file"), checkTheRole('author','admin'),createPost)
                .delete(protectRoute, checkTheRole('admin'),deletePosts);

                router
                .route("/:id")
                .get(protectRoute, getPost)
                .post(protectRoute,checkTheRole('author'), updatePost)
                .delete(protectRoute, checkTheRole('author','admin'),deletePost);



#END_POINT=['http:/localhost:5000/api/auth']<=>{success:true | false,data: user| users | "string"}:
     => USER:

                router
                .route("/").get(protectRoute, getUsers).delete(protectRoute,checkTheRole('admin'),deleteUsers);
                router.route("/register").post(register);

                router.route("/login").post(login);
                router.route("/:id").get(protectRoute, getUser);
                router.route("/updateUserDetails").put(protectRoute,updateUserDetails);
                router.route("/me/getme").get(protectRoute,whoIam);
                router.route("/logout").post(protectRoute, logout);

          **register:{
               name,
               email,
               password
          }
         **login:{
            email,
            password
           }

NOTE:FOR BOTH IF THE REQUEST FAILED THE RESPONSE WILL BE {success:false,err:String}