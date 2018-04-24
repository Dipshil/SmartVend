from scipy.stats import truncnorm

def random_time_gen(num, mean, sd, low, upp):
    gen = truncnorm(
        (low - mean) / sd, (upp - mean) / sd, loc=mean, scale=sd)

    return gen.rvs(num)
