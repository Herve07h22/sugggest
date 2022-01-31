import { MailService } from "../../gateways/mail/MailService";
import { Lead } from "../models/Lead";
import { LeadRepository } from "../repository/LeadRepository";

export async function addLeadAndsendToken(
  lead: Lead,
  mailService: MailService,
  leadRepository: LeadRepository
) {
  await leadRepository.upsertLead(lead);
  const url = process.env.URL_GENERATION_PAGE;
  if (!url) throw new Error("URL_GENERATION_PAGE is not set");

  await mailService.sendToken(lead.email, `${url}/${lead.token}`);
  return { status: "success", token: lead.token };
}
