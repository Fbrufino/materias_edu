jQuery.fn.dataTable.ext.search.push(
    function (settings,data,dataIndex) {
	dias = ['seg','ter','qua','qui','sex','sab'];
	periodos = [];
	for (i in dias) {
	    buff = jQuery("#grade tr td:nth-child("+String(Number(i)+2)+").grade_chk").toArray();
	    for (b in buff) {
		buff[b] = buff[b].innerHTML;
	    }
	    periodos.push(buff)

	    if (data[6]==dias[i]) {
		if (jQuery.inArray(data[5],periodos[i])>-1) {
		    return true;
		};
	    };
	};
	return false;
    });

jQuery.fn.dataTable.ext.search.push(
    function (settings,data,dataIndex) {
	var term = new RegExp(jQuery('#buscatps')[0].value,'i');
	if ((term.test(data[2])) || (term.test(data[1])) || (term.test(data[7]))) {
	    return true;
	}
	return false;
    });

function format ( d ) {
    return '<table cellpadding="5" cellspacing="0" border="0" class="sub" style="padding-right:7.5%;padding-left:7.5%;font-size:80%">'+
	'<tr>'+
	    '<td colspan="3" style="text-align:center"><b>Departamento de '+d.departamento+'</b></td>'+
	'</tr>'+
	'<tr class="sub">'+
	    '<td>Horário: '+d.aula1_dia+', das '+d.aula1_inicio+' às '+d.aula1_fim+'</td>'+
	    '<td></td>'+
	    '<td style="text-align:right">Prof(a).: '+d.aula1_professor+'</td>'+
	'</tr>'+
	'<tr>'+
	    '<td colspan="3"><p style="text-align:center"><b>Sinopse da matéria</b></p>'+
	    '<p style="padding-left:15%;padding-right:15%;text-align:justify">'+d.desc+'<br><br><span style="font-size:70%"><a href="'+d.link+'">Ver mais no Júpiter</a></span></p></td>'+
	'</tr>'+
    '</table>';
}

jQuery(document).ready(function() {
    var table = jQuery('#example').DataTable( {
	paging: false,
	data: lista,
	"dom" : 'lrtip',
	"columns": [
	    { data: "departamento", "visible": false },
	    { data: "sigla" },
	    { data: "titulo" },
	    { data: "turma", "searchable": false },
	    { data: "desc", "visible": false, "searchable": false },
	    { data: "aula1_periodo", "visible": false, "searchable": true },
	    { data: "aula1_dia", "visible": false },
	    { data: "aula1_professor", "visible": false } 
	],
	"columnDefs": [
	    { className: "dt-body-center", "targets": [1,2,3] }
	]
    } );

    jQuery('#example tbody').on('click', 'tr.odd td, tr.even td', function () {
	var tr = jQuery(this).closest('tr');
	var row = table.row( tr );
 
	if ( row.child.isShown() ) {
	    // This row is already open - close it
	    row.child.hide();
	    tr.removeClass('shown');
	}
	else {
	    // Open this row
	    row.child( format(row.data()) ).show();
	    tr.addClass('shown');
	}
    } );
    
    jQuery('#ctrl_dep').on('change', 'input', function () {
	var arr = new Array;
	var inps = jQuery('#ctrl_dep input');
	for (n in inps) {
	    if (inps[n].checked==true) {
		arr.push("("+inps[n].value+")");
	    };
	};
	if (arr.length==0) {
	    arr = ["^jQuery"];
	}
	table.column(0).search(arr.join("|"),true);
	table.draw();
	});

    jQuery('#grade td.grade_chk').on('click', function () {
	jQuery(this).toggleClass('grade_chk');
	jQuery(this).toggleClass('grade_unchk');
	table.draw();
    });

    jQuery('span.grade_col').on('click', function () {
	var num = 7 - jQuery(this).closest('th').nextAll().size();
	if (jQuery('#grade td:nth-child('+String(num)+').grade_chk').size()>1) {
	    jQuery('#grade td:nth-child('+String(num)+').grade_chk').addClass('grade_unchk');
	    jQuery('#grade td:nth-child('+String(num)+').grade_chk').removeClass('grade_chk');
	} else {
	    jQuery('#grade td:nth-child('+String(num)+').grade_unchk').addClass('grade_chk');
	    jQuery('#grade td:nth-child('+String(num)+').grade_unchk').removeClass('grade_unchk');
	}
	table.draw();
    });

    jQuery('td.grade_lin').on('click', function () {
	var that = this;
	if (jQuery(that).nextAll('.grade_chk').size()>3) {
	    jQuery(that).nextAll('.grade_chk').addClass('grade_unchk');
	    jQuery(that).nextAll('.grade_chk').removeClass('grade_chk');
	} else {
	    jQuery(that).nextAll('.grade_unchk').addClass('grade_chk');
	    jQuery(that).nextAll('.grade_unchk').removeClass('grade_unchk');
	};
	table.draw();
    });

    jQuery('#buscatps').on('keyup change', function () {
	table.draw();
    });
    
    jQuery('#togg_hr').on('click', function () {
	if (jQuery('#ctrl_hr').css('display')=='none' && jQuery('#ctrl_dep').css('display')=='none') {
	    jQuery('#ctrl_hr').slideDown(200);
	    jQuery('#but_hr').addClass('shdw');
	} else if (jQuery('#ctrl_hr').css('display')!='none') {
	    jQuery('#ctrl_hr').slideUp(200);
	    jQuery('#but_hr').removeClass('shdw');
	} else {
	    jQuery('#ctrl_dep').hide();
	    jQuery('#but_hr').addClass('shdw');
	    jQuery('#but_dep').removeClass('shdw');
	    jQuery('#ctrl_hr').show();
	};
    });
    
    jQuery('#togg_dep').on('click', function () {
	if (jQuery('#ctrl_hr').css('display')=='none' && jQuery('#ctrl_dep').css('display')=='none') {
	    jQuery('#ctrl_dep').slideDown(200);
	    jQuery('#but_dep').addClass('shdw');
	} else if (jQuery('#ctrl_dep').css('display')!='none') {
	    jQuery('#ctrl_dep').slideUp(200);
	    jQuery('#but_dep').removeClass('shdw');
	} else {
	    jQuery('#ctrl_hr').hide();
	    jQuery('#but_dep').addClass('shdw');
	    jQuery('#but_hr').removeClass('shdw');
	    jQuery('#ctrl_dep').show();
	};
    });
} );
