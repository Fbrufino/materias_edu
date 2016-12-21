# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class Aula(scrapy.Item):
    unidade = scrapy.Field()
    departamento = scrapy.Field()
    sigla = scrapy.Field()
    titulo = scrapy.Field()
    desc = scrapy.Field()
    link = scrapy.Field()
    turma = scrapy.Field()
    dia = scrapy.Field()
    professor = scrapy.Field()
    inicio = scrapy.Field()
    fim = scrapy.Field()


#ofer = scrapy.Field()
#optativa = scrapy.Field()

class Biblio(scrapy.Item):
    unidade = scrapy.Field()
    departamento = scrapy.Field()
    sigla = scrapy.Field()
    titulo = scrapy.Field()
    link = scrapy.Field()
    bib = scrapy.Field()
