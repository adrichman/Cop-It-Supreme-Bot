const fillCheckout = () => {
	chrome.runtime.sendMessage({msg: "privateData"}, function(data) {
		var r = JSON.parse(data)

		chrome.runtime.sendMessage({msg: "params"}, function(settings) {

			if ($('#order_billing_country').find('option[value=' + r.country + ']').length > 0) {
				//this remove captcha but not stable, payment failed sometimes
				if (settings.removeCaptcha)
					$(".g-recaptcha").remove()

				//shipping
				$('#order_billing_name').val(r.name)
				$('#order_email').val(r.email)
				$('#order_tel').val(r.phone)
				$('#bo').val(r.address1)
				$('#oba3').val(r.address2)
				if (r.country != "USA" && r.country != "CANADA")
					$('#order_billing_address_3').val(r.address3)
				$('#order_billing_zip').val(r.zip)
				$('#order_billing_city').val(r.city)
				if (r.country == "USA")
					$('#order_billing_state').val(r.state)
				else if (r.country == "CANADA")
					document.getElementById("state_label").innerHTML = "province";
					document.getElementById("order_billing_state").innerHTML = '"<option value=""></option>' +
					'<option value="AB">AB</option>' +
					'<option value="BC">BC</option>' +
					'<option value="MB">MB</option>' +
					'<option value="NB">NB</option>' +
					'<option value="NL">NL</option>' +
					'<option value="NT">NT</option>' +
					'<option value="NS">NS</option>' +
					'<option value="NU">NU</option>' +
					'<option value="ON">ON</option>' +
					'<option value="PE">PE</option>' +
					'<option value="QC">QC</option>' +
					'<option value="SK">SK</option>' +
					'<option value="YT">YT</option>'
					$('#order_billing_state').val(r.province);
				$('#order_billing_country').val(r.country)

				//billing
				$('#credit_card_type').val(r.card_type)
				//guess longest input with name like "card" is cc # and next-longest is cvv
				let cardInputFields = $('input[name*=card]').sort(e => $(e).width())
				cardInputFields.eq(0).val(r.card_number)
				cardInputFields.eq(1).val(r.cvv)
				$('select[name*=month]').eq(0).val(r.card_month);
				$('select[name*=year]').eq(0).val(r.card_year);
				$(".icheckbox_minimal").click()
				if (settings.autoCheckout)
					setTimeout(() => $('[name=commit]').click(), 1380)

			}
		})
	})
}
