<?php

	require "inc/PHPMailerAutoload.php";
	$mail = new PHPMailer;
	$mailThanks = new PHPMailer;
	
	// CONFIGURATION
	$to  		= "maurizio.batta@libero.it";
	$name 		= $_POST['name']; 
	$email 		= $_POST['email']; 
	$tel		= $_POST['tel'];
	$subject	= $_POST['subject'];
	$message 	= $_POST['message']; 
		 		 
	
	// Build the email body text
  	$body = '
  			<table width="100%" align="center" cellpadding="7" cellspacing="7">
				<tr height="75" bgcolor="#222533">
					<td colspan="2" align="center"><font face="Verdana" size="5" color="#ffffff">'.strtoupper($subject).'</font></td>
				</tr>
					<tr height="40" valign="top">
						<td width="35%" align="right"><font face="Verdana" size="2" color="#222533">NAME</font></td>
						<td align="left"><font face="Verdana" size="2" color="#a1b1bc">'.$name.'</font></td>
					</tr>
					<tr height="40" valign="top">
						<td width="35%" align="right"><font face="Verdana" size="2" color="#222533">EMAIL</font></td>
						<td align="left"><font face="Verdana" size="2" color="#a1b1bc">'.$email.'</font></td>
					</tr>
					<tr height="40" valign="top">
						<td width="35%" align="right"><font face="Verdana" size="2" color="#222533">TELEPHONE</font></td>
						<td align="left"><font face="Verdana" size="2" color="#a1b1bc">'.$tel.'</font></td>
					</tr>
					<tr height="40" valign="top">
						<td width="35%" align="right"><font face="Verdana" size="2" color="#222533">MESSAGE</font></td>
						<td align="left"><font face="Verdana" size="2" color="#a1b1bc">'.utf8_decode(nl2br($message)).'</font></td>
					</tr>
				<tr height="75" bgcolor="#222533">
					<td colspan="2"><font face="Verdana" size="5" color="#222533">'.strtoupper($subject).'</font></td>
				</tr>
			</table>
			'; 
	                        
	
	$mail->From		= $email;
	$mail->FromName	= $name;
	$mail->addAddress($to, "Maurizio");  
	
	$mail->Subject	= "CONTACT FORM - The Fox";	
	$mail->isHTML(true);                            	
	$mail->Body		= $body;
	$mail->AltBody	= $message;
	
	
	// VERIFICA SPAM
	function spamFilter($value){
		if(preg_match('/(http|www)/', $value)){
			echo '<span class="error"><span class="glyphicon glyphicon-remove"></span> <strong><u>SPAM FILTER</u></strong><br>verify the presence of links</span>';
			exit(1);
		}
	}
	
	spamFilter($name);
	spamFilter($email);
	spamFilter($subject);
	spamFilter($message);
	
	// VERIFICA INVIO
	
	if(!$mail->send()) {
	    echo '<span class="error"><span class="glyphicon glyphicon-remove"></span> Message could not be sent.</span><br>';
	    echo '<strong>Mailer Error:</strong> ' . $mail->ErrorInfo;
	} else {
	    echo '<span class="success"><span class="glyphicon glyphicon-ok"></span> message sent successfully</span>';
	}
	
	// MAIL RINGRAZIAMENTO
	// Build the email body text
  	$bodyThanks = '
  			<table width="100%" align="center" cellpadding="10" cellspacing="10">
				<tr height="75" bgcolor="#222533">
					<td colspan="2" align="center"><font face="Verdana" size="5" color="#ffffff">THANK YOU!</font></td>
				</tr>
				<tr height="auto" valign="top">
					<td width="100%" align="left">
					<font face="Verdana" size="4" color="#222533">
						Ciao, <b><i>'.$name.'</i></b>, grazie per avermi scritto!<br>
						Verrai ricontattato il prima possibile.
						<br><br><br><br><br><br><br>
						- The Fox
					</font></td>
				</tr>
				<tr height="75" bgcolor="#222533">
					<td colspan="2"><font face="Verdana" size="5" color="#222533">GRAZIE</font></td>
				</tr>
			</table>
			'; 
	                        
	
	$mailThanks->From		= $to;
	$mailThanks->FromName	= "The Fox";
	$mailThanks->addAddress($email, $name);  
	
	$mailThanks->Subject	= "THANK YOU - The Fox";	
	$mailThanks->isHTML(true);                            	
	$mailThanks->Body		= $bodyThanks;
	$mailThanks->AltBody	= "Grazie per avermi scritto, verrai ricontattato il prima possibile";
	
	if(!$mailThanks->send()) {
	    echo '<span class="error"><span class="glyphicon glyphicon-remove"></span> Message could not be sent.</span><br>';
	    echo '<strong>Mailer Error:</strong> ' . $mail->ErrorInfo;
	} else {
	    //echo '<span class="success"><span class="glyphicon glyphicon-ok"></span> message sent successfully</span>';
	}
	

?> 