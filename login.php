<?php include 'header.php'; ?>
 <div id="contact" class="section-cotent toppad">
        <div class="container">
            <div class="title-section text-center">
                <h2>Login</h2>
                <span></span>
                
            </div> <!-- /.title-section -->
            <div class="row">
                <div class="col-md-4 col-sm-4">
                   <script type="text/javascript">
			function validateForm() {
			     document.getElementById("demo").innerHTML = "Username- password incorrect combination. Contact our office";
			   
				return false;
			   
			}
		   </script>
                  
                </div> <!-- /.col-md-3 -->
                <div class="col-md-4 col-sm-4">
                   <form name="myForm" action="#" onsubmit="return validateForm()" method="post">
                     <div class="contact-form">
                        <p class="full-row">
                            <label for="name-id">User Name:</label>
                            <input type="text" id="name-id" name="name-id">
                        </p>
                        <p class="full-row">
                            <label for="email-id">Password</label>
                            <input type="password" id="email-id" name="email-id">
                        </p>
                       <input class="mainBtn" type="submit" name="" value="Login">
                        <p id="demo" style="color:red;"></p>
                    </div>
</form>
                </div> <!-- /.col-md-3 -->
                <div class="col-md-4 col-sm-4">
                   
                   
                </div> <!-- /.col-md-3 -->
            </div> <!-- /.row -->
        </div> <!-- /.container -->
    </div> <!-- /#contact -->
   
<?php include 'footer.php'; ?>
