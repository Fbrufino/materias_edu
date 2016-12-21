# -*- coding: UTF-8 -*-
import scrapy, re
from grade_educa.items import Aula

class ListaMatsSpider(scrapy.Spider):
    name = 'listamats'
    allowed_domains = ['uspdigital.usp.br']
    start_urls = [
	'https://uspdigital.usp.br/jupiterweb/jupDisciplinaLista?codcg=48&tipo=D',
	'https://uspdigital.usp.br/jupiterweb/jupDisciplinaLista?codcg=48&letra=M-U&tipo=D'
    ]

    def parse(self, response):
	radical = 'https://uspdigital.usp.br/jupiterweb/'
	table = response.xpath('//*[contains(text(), "Sigla")]').xpath('../../../..')
	for tit in table.xpath('.//a'):
	    item = Aula()
	    item['titulo'] = tit.xpath('./text()').extract()
	    url = radical + tit.xpath('./@href').extract()[0]
	    item['link'] = url
	    item['sigla'] = tit.xpath('../../..').xpath('preceding-sibling::td/font/span/text()').extract()[0].strip()
	    request = scrapy.Request(url, callback=self.parse_1)
	    request.meta['item'] = item
	    yield request

    def parse_1(self, response):
	radical = 'https://uspdigital.usp.br/jupiterweb/'
	item = response.meta['item']
	text = response.xpath('//*[td/font/span/b/text()="Programa Resumido"]/following-sibling::tr/td/font/span')[0].extract()
	text = re.sub(r'<span.*?>|</span>','',text)
	text = re.sub(r'<br>','\r\n',text).strip()
	item['desc'] = text
	item['departamento'] = response.xpath('//tr[td/font/span/b[contains(text(),"Disciplina:")]]').xpath('preceding-sibling::tr[2]/td/b/font/span/text()').extract()[0].strip()
	item['unidade'] = response.xpath('//tr[td/font/span/b[contains(text(),"Disciplina:")]]').xpath('preceding-sibling::tr[4]/td/b/font/span/text()').extract()[0].strip()
	url = radical + response.xpath('//a[contains(text(), "oferecimento")]/@href').extract()[0]
	request = scrapy.Request(url, callback=self.parse_2)
	request.meta['item'] = item
 	yield request

    def parse_2(self,response):
	item = response.meta['item']
	tabs_turmas = response.xpath(u'//*[text()="Horário"]/../../../../..')
	n_turmas = len(tabs_turmas)
	if n_turmas>0:
	    for tabtur in tabs_turmas:
		item['turma'] = tabtur.xpath('preceding::table[1]/tr[1]/td[2]/font/span/text()').extract()[0].strip()
		for tabaula in tabtur.xpath('tr[td[2]]')[1:]:
		    item['dia'] = tabaula.xpath('td[1]/font/span/text()').extract()[0].strip()
		    item['inicio'] = tabaula.xpath('td[2]/font/span/text()').extract()[0].strip()
		    item['fim'] = tabaula.xpath('td[3]/font/span/text()').extract()[0].strip()
		    item['professor'] = tabaula.xpath('td[4]/font/span/text()').extract()[0].strip()
		    yield item
#	else:
#	    item['n_aulas'] = 0
#	    yield item

# Quando há dois professores, como em EDM0400, há uma linha só para o segundo professor.
# Retirar espaços duplos, aspas na beirada

'''
tabs_turmas = response.xpath(u'//*[text()="Horário"]/../../../../..')
item['turmas'] = len(tab_turmas)

    item['dia'] = response.xpath(u'//*[text()="Horário"]/../../../../..')[0].xpath('tr[2]/td[1]/font/span/text()')
    item['h_ini'] = response.xpath(u'//*[text()="Horário"]/../../../../..')[0].xpath('tr[2]/td[2]/font/span/text()')
    item['h_fim'] = response.xpath(u'//*[text()="Horário"]/../../../../..')[0].xpath('tr[2]/td[3]/font/span/text()')
    item['prof'] = response.xpath(u'//*[text()="Horário"]/../../../../..')[0].xpath('tr[2]/td[4]/font/span/text()')
'''
