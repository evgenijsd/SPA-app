using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace SPA_app.API.Validators
{
    public interface ICaptchaValidator
    {
        Task<bool> IsCaptchaPassedAsync(string token);
    }
    public class ReCaptchaValidator : ICaptchaValidator
    {
        private const string RemoteAddress = "https://www.google.com/recaptcha/api/siteverify";
        private readonly string _secretKey;
        private readonly double acceptableScore;
        private readonly IHttpClientFactory _httpClientFactory;

        public ReCaptchaValidator(IHttpClientFactory httpClient, IConfiguration configuration)
        {
            _httpClientFactory = httpClient;
            _secretKey = configuration["ReCaptcha:SecretKey"];
        }

        public async Task<bool> IsCaptchaPassedAsync(string token)
        {
            dynamic response = await GetCaptchaResultDataAsync(token);
            if (response.success == "true")
            {
                return true;
            }
            return false;
        }

        public async Task<JObject> GetCaptchaResultDataAsync(string token)
        {
            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("secret", _secretKey),
                new KeyValuePair<string, string>("response", token)
            });
            using var httpClient = _httpClientFactory.CreateClient();
            var res = await httpClient.PostAsync(RemoteAddress, content);
            if (res.StatusCode != HttpStatusCode.OK)
            {
                throw new HttpRequestException(res.ReasonPhrase);
            }
            var jsonResult = await res.Content.ReadAsStringAsync();
            return JObject.Parse(jsonResult);
        }
    }
}
