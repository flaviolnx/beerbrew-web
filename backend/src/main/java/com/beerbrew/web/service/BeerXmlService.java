package com.beerbrew.web.service;

import com.beerbrew.web.model.*;
import org.springframework.stereotype.Service;
import org.w3c.dom.*;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

@Service
public class BeerXmlService {

    public String exportToBeerXml(Recipe r) {
        StringBuilder xml = new StringBuilder();
        xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<RECIPES>\n  <RECIPE>\n");
        xml.append("    <NAME>").append(esc(r.getName())).append("</NAME>\n");
        xml.append("    <VERSION>1</VERSION>\n");
        xml.append("    <TYPE>").append(esc(r.getType())).append("</TYPE>\n");
        xml.append("    <BREWER>").append(esc(r.getBrewer())).append("</BREWER>\n");
        xml.append("    <BATCH_SIZE>").append(r.getBatchSizeLiters()).append("</BATCH_SIZE>\n");
        xml.append("    <BOIL_SIZE>").append(r.getBoilSizeLiters()).append("</BOIL_SIZE>\n");
        xml.append("    <BOIL_TIME>").append(r.getBoilTimeMinutes()).append("</BOIL_TIME>\n");
        xml.append("    <EFFICIENCY>").append(r.getEfficiencyPercent()).append("</EFFICIENCY>\n");
        xml.append("    <STYLE><NAME>").append(esc(r.getStyle())).append("</NAME><VERSION>1</VERSION></STYLE>\n");

        xml.append("    <FERMENTABLES>\n");
        for (Fermentable f : r.getFermentables()) {
            xml.append("      <FERMENTABLE><NAME>").append(esc(f.getName())).append("</NAME><VERSION>1</VERSION>")
               .append("<TYPE>").append(esc(f.getType())).append("</TYPE>")
               .append("<AMOUNT>").append(f.getAmountKg()).append("</AMOUNT>")
               .append("<YIELD>").append(f.getYieldPercent()).append("</YIELD>")
               .append("<COLOR>").append(f.getColorLovibond()).append("</COLOR></FERMENTABLE>\n");
        }
        xml.append("    </FERMENTABLES>\n");

        xml.append("    <HOPS>\n");
        for (Hop h : r.getHops()) {
            xml.append("      <HOP><NAME>").append(esc(h.getName())).append("</NAME><VERSION>1</VERSION>")
               .append("<ALPHA>").append(h.getAlphaAcidPercent()).append("</ALPHA>")
               .append("<AMOUNT>").append(h.getAmountGrams() / 1000.0).append("</AMOUNT>")
               .append("<USE>").append(esc(h.getUseType())).append("</USE>")
               .append("<TIME>").append(h.getBoilTimeMinutes()).append("</TIME>")
               .append("<FORM>").append(esc(h.getForm())).append("</FORM></HOP>\n");
        }
        xml.append("    </HOPS>\n");

        xml.append("    <YEASTS>\n");
        for (Yeast y : r.getYeasts()) {
            xml.append("      <YEAST><NAME>").append(esc(y.getName())).append("</NAME><VERSION>1</VERSION>")
               .append("<TYPE>").append(esc(y.getType())).append("</TYPE>")
               .append("<FORM>").append(esc(y.getForm())).append("</FORM>")
               .append("<LABORATORY>").append(esc(y.getLaboratory())).append("</LABORATORY>")
               .append("<PRODUCT_ID>").append(esc(y.getProductId())).append("</PRODUCT_ID>")
               .append("<ATTENUATION>").append(y.getAttenuationPercent()).append("</ATTENUATION></YEAST>\n");
        }
        xml.append("    </YEASTS>\n");

        xml.append("    <MISCS>\n");
        for (Misc m : r.getMiscs()) {
            xml.append("      <MISC><NAME>").append(esc(m.getName())).append("</NAME><VERSION>1</VERSION>")
               .append("<TYPE>").append(esc(m.getType())).append("</TYPE>")
               .append("<USE>").append(esc(m.getUseType())).append("</USE>")
               .append("<TIME>").append(m.getTimeMinutes()).append("</TIME>")
               .append("<AMOUNT>").append(m.getAmount() / 1000.0).append("</AMOUNT></MISC>\n");
        }
        xml.append("    </MISCS>\n");

        xml.append("    <MASH><NAME>Mash Schedule</NAME><VERSION>1</VERSION><MASH_STEPS>\n");
        for (MashStep s : r.getMashSteps()) {
            xml.append("      <MASH_STEP><NAME>").append(esc(s.getName())).append("</NAME><VERSION>1</VERSION>")
               .append("<TYPE>").append(esc(s.getType())).append("</TYPE>")
               .append("<INFUSE_AMOUNT>").append(s.getInfuseAmountLiters()).append("</INFUSE_AMOUNT>")
               .append("<STEP_TEMP>").append(s.getTargetTempC()).append("</STEP_TEMP>")
               .append("<STEP_TIME>").append(s.getStepTimeMinutes()).append("</STEP_TIME></MASH_STEP>\n");
        }
        xml.append("    </MASH_STEPS></MASH>\n");
        xml.append("    <NOTES>").append(esc(r.getNotes())).append("</NOTES>\n");
        xml.append("  </RECIPE>\n</RECIPES>");
        return xml.toString();
    }

    public Recipe importFromBeerXml(String xmlContent) throws Exception {
        Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder()
                .parse(new ByteArrayInputStream(xmlContent.getBytes(StandardCharsets.UTF_8)));
        Element recipeEl = (Element) doc.getElementsByTagName("RECIPE").item(0);
        if (recipeEl == null) throw new IllegalArgumentException("No <RECIPE> element found in BeerXML");

        Recipe r = new Recipe();
        r.setName(tag(recipeEl, "NAME", "Imported BeerXML Recipe"));
        r.setType(tag(recipeEl, "TYPE", "All Grain"));
        r.setBrewer(tag(recipeEl, "BREWER", "Brewer"));
        r.setBatchSizeLiters(num(recipeEl, "BATCH_SIZE", 20.0));
        r.setBoilSizeLiters(num(recipeEl, "BOIL_SIZE", 24.0));
        r.setBoilTimeMinutes(num(recipeEl, "BOIL_TIME", 60.0));
        r.setEfficiencyPercent(num(recipeEl, "EFFICIENCY", 75.0));
        r.setNotes(tag(recipeEl, "NOTES", ""));

        NodeList styleNodes = recipeEl.getElementsByTagName("STYLE");
        if (styleNodes.getLength() > 0) {
            r.setStyle(tag((Element) styleNodes.item(0), "NAME", "Custom Style"));
        }

        NodeList ferms = recipeEl.getElementsByTagName("FERMENTABLE");
        for (int i = 0; i < ferms.getLength(); i++) {
            Element el = (Element) ferms.item(i);
            Fermentable f = new Fermentable();
            f.setName(tag(el, "NAME", "Malt"));
            f.setType(tag(el, "TYPE", "Grain"));
            f.setAmountKg(num(el, "AMOUNT", 1.0));
            f.setYieldPercent(num(el, "YIELD", 80.0));
            f.setColorLovibond(num(el, "COLOR", 2.0));
            r.getFermentables().add(f);
        }

        NodeList hops = recipeEl.getElementsByTagName("HOP");
        for (int i = 0; i < hops.getLength(); i++) {
            Element el = (Element) hops.item(i);
            Hop h = new Hop();
            h.setName(tag(el, "NAME", "Hop"));
            h.setAlphaAcidPercent(num(el, "ALPHA", 5.0));
            h.setAmountGrams(num(el, "AMOUNT", 0.025) * 1000.0);
            h.setUseType(tag(el, "USE", "Boil"));
            h.setBoilTimeMinutes(num(el, "TIME", 60.0));
            h.setForm(tag(el, "FORM", "Pellet"));
            r.getHops().add(h);
        }

        NodeList yeasts = recipeEl.getElementsByTagName("YEAST");
        for (int i = 0; i < yeasts.getLength(); i++) {
            Element el = (Element) yeasts.item(i);
            Yeast y = new Yeast();
            y.setName(tag(el, "NAME", "Yeast"));
            y.setType(tag(el, "TYPE", "Ale"));
            y.setForm(tag(el, "FORM", "Dry"));
            y.setLaboratory(tag(el, "LABORATORY", ""));
            y.setProductId(tag(el, "PRODUCT_ID", ""));
            y.setAttenuationPercent(num(el, "ATTENUATION", 75.0));
            r.getYeasts().add(y);
        }

        NodeList miscs = recipeEl.getElementsByTagName("MISC");
        for (int i = 0; i < miscs.getLength(); i++) {
            Element el = (Element) miscs.item(i);
            Misc m = new Misc();
            m.setName(tag(el, "NAME", "Misc"));
            m.setType(tag(el, "TYPE", "Fining"));
            m.setUseType(tag(el, "USE", "Boil"));
            m.setTimeMinutes(num(el, "TIME", 15.0));
            m.setAmount(num(el, "AMOUNT", 0.005) * 1000.0);
            r.getMiscs().add(m);
        }

        NodeList steps = recipeEl.getElementsByTagName("MASH_STEP");
        for (int i = 0; i < steps.getLength(); i++) {
            Element el = (Element) steps.item(i);
            MashStep s = new MashStep();
            s.setStepOrder(i + 1);
            s.setName(tag(el, "NAME", "Saccharification"));
            s.setType(tag(el, "TYPE", "Infusion"));
            s.setInfuseAmountLiters(num(el, "INFUSE_AMOUNT", 15.0));
            s.setTargetTempC(num(el, "STEP_TEMP", 66.0));
            s.setStepTimeMinutes(num(el, "STEP_TIME", 60.0));
            r.getMashSteps().add(s);
        }

        return r;
    }

    private String tag(Element parent, String name, String fallback) {
        NodeList list = parent.getElementsByTagName(name);
        if (list.getLength() == 0 || list.item(0).getTextContent() == null) return fallback;
        String val = list.item(0).getTextContent().trim();
        return val.isEmpty() ? fallback : val;
    }

    private double num(Element parent, String name, double fallback) {
        try {
            return Double.parseDouble(tag(parent, name, String.valueOf(fallback)));
        } catch (NumberFormatException e) {
            return fallback;
        }
    }

    private String esc(String s) {
        if (s == null) return "";
        return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }
}
