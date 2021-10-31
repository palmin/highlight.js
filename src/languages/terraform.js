/*
Language: Terraform
*/

function(hljs) {
    var NUMBERS = {
	className: 'number',
	begin: '\\b\\d+(\\.\\d+)?',
	relevance: 0
    };
    var STRINGS = {
	className: 'string',
	begin: '"',
	end: '"',
	contains: [{
	    className: 'variable',
	    begin: '\\${',
	    end: '\\}',
	    relevance: 9,
	    contains: [{
		className: 'string',
		begin: '"',
		end: '"'
	    }, {
		className: 'meta',
		begin: '[A-Za-z_0-9]*' + '\\(',
		end: '\\)',
		contains: [
		    NUMBERS, {
			className: 'string',
			begin: '"',
			end: '"',
			contains: [{
			    className: 'variable',
			    begin: '\\${',
			    end: '\\}',
			    contains: [{
				className: 'string',
				begin: '"',
				end: '"',
				contains: [{
				    className: 'variable',
				    begin: '\\${',
				    end: '\\}'
				}]
			    }, {
				className: 'meta',
				begin: '[A-Za-z_0-9]*' + '\\(',
				end: '\\)'
			    }]
			}]
		    },
		    'self']
	    }]
	}]
    };

    return {
	name: 'Terraform',
	aliases: ['tf', 'hcl'],
	keywords: {
	    keyword: 'resource variable provider output locals module data terraform|10 backend var local',
	    type: 'string number object map list set',
	    literal: 'false true null'
	},
	literal: 'false true null',
	contains: [
	    hljs.COMMENT('\\#', '$'),
	    NUMBERS,
	    STRINGS
	]
    }
}
