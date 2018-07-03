import React from 'react';

const Contact = props => (
<section>
<div id="map-area">
	<div className="container">
		<div className="row">
			<div className="communication d-flex wow fadeInDown" data-wow-offset="120" data-wow-duration="3s">
				<div className="col-md-4 con d-flex">
					<a href=""><i className="fas fa-phone"></i></a><p>Contact Number<br>+345-3909655627</p>
				</div>
				<div className="col-md-4 mail d-flex">
					<a href=""><i className="far fa-envelope"></i></a><p>Email Address<br>+2390-875-5664</p>
				</div>
				<div className="col-md-4 loc d-flex">
					<a href=""><i className="fas fa-map-marker-alt"></i></a><p>Location<br>Buffalo Street,#205, Northwest-3087</p>
				</div>
			</div>
		</div>
	</div>	
</div>
</section>

)

export default Contact;