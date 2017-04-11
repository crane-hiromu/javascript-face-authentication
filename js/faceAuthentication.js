var FACE = FACE || {};

FACE.AUTH = {
 CLASS: 'border',

 init:function(){
	this.setParameters();
	this.bindEvent();
 },

 setParameters:function(){
	this.$changeButton = $('.jsc-change-btn');
	this.$imagId = $('#face-image');
	this.$border = $('.' + this.CLASS);
 },

 bindEvent:function(){
	var self = this;
	this.$changeButton.click(function(e) {
	 e.preventDefault();
	 self.addAuthBorder();
	});
 },

 addAuthBorder:function(){
	var self = this;
	this.$border.remove();

	/* faceDetectionで画像にある顔を探す */
	this.$imagId.faceDetection({
		complete: function (faces) { //成功時
				self.setBorderParams(faces);
		},
	 error:function (code, message) { //失敗時
		alert('Error: ' + message);
	 }
	});
 },

	/* 顔認識がわかるボーダーを付与する */
	setBorderParams:function(faces){
		if(faces.length == 0){ return }

		for (var i = 0; i < faces.length; i++) {
				$('<div>', { 'class':this.CLASS,
						'css': {
								'left': faces[i].x * faces[i].scaleX + 'px',
								'top': faces[i].y * faces[i].scaleY + 'px',
								'width': faces[i].width  * faces[i].scaleX + 'px',
								'height': faces[i].height * faces[i].scaleY + 'px'
						}
				}).insertAfter(this.$imagId);
		}
	}
}

$(function(){
 FACE.AUTH.init();
});
