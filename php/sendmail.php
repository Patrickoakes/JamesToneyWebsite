<?php
if(isset($_POST['name'])) {$name = htmlspecialchars(stripslashes(trim($_POST['name'])));}
if(isset($_POST['email'])) {$email = htmlspecialchars(stripslashes(trim($_POST['email'])));}
if(isset($_POST['phone'])) {$phone = htmlspecialchars(stripslashes(trim($_POST['phone'])));}
if(isset($_POST['message'])) {$message = htmlspecialchars(stripslashes(trim($_POST['message'])));}

if(isset($name) && isset($email) && isset($phone) && isset($message)) {
	if(!empty($name) && !empty($email) && !empty($phone) && !empty($message)) {
		$email = filter_var($email, FILTER_SANITIZE_EMAIL);
		if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {						
						$to = "irakli.iakobishvili.test@gmail.com"; //Replace with your own email
						$subject = "From Firstname Lastname";							
						$msg = '
                        <html>
						<head>
						   <title>Contact</title>	
						</head>
						<body>
							<table>
							  <tr>
								<td><strong>Name:</strong> '.$name.'</td>
							  </tr>
							  <tr>
							  <tr>
								<td><strong>Email:</strong> <a href=mailto:'.$email.'>'.$email.'</a></td>
							  </tr>
							  <tr>
								<td><strong>Tel:</strong> '.$phone.'</td>
							  </tr>
							  <tr>
							  <tr>
								<td>'.$message.'</td>
							  </tr>
							</table>
						</body>
						</html>';
						
						// Always set content-type when sending HTML email
						$headers = "MIME-Version: 1.0" . "\r\n";
						$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
						// More headers
						$headers .= 'From: <'.$email.'>' . "\r\n";
						if (mail($to,$subject,$msg,$headers)) {
							echo "Sent";
						}else {
							echo "Failed";
						}		
		}else {
			echo("Wrong");
			exit();
		}
	}else {
		echo "empty";	
	}
}else {
	echo "Not isset!";
}
?>